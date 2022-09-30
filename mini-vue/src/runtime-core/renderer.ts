import { EMPTY_OBJ, isObject } from "../../shared/index"
import { ShapeFlags } from "../../shared/ShapeFlags"
import { effect } from "../reactivity"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment,Text } from "./vnode"
import {shouldUpdateComponent} from './componentUpdateUtils'

export function createRenderer(options){
    const {
        createElement:hostCreateElement,
        patchProp:hostPatchProp,
        insert:hostInsert,
        remove:hostRemove,
        setElementText:hostSetElementText
    } = options

    function render(vnode,container){
        patch(null,vnode,container,null,null)
    
    }
    // n1 => 老的
    // n2 => 新的
    function patch(n1,n2,container,parentComponent,anchor){ // 职责：根据 n2 更新(mount) container位置 的界面
        const { shapeFlag,type } = n2
    
        switch (type){
            case Fragment:
                processFragment(n1,n2,container,parentComponent,anchor)
    
                break
            case Text:
                processText(n1,n2,container)
    
                break
            default:
                if(shapeFlag & ShapeFlags.ELEMENT){
                    processElement(n1,n2,container,parentComponent,anchor)
            
                }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
                    processComponent(n1,n2,container,parentComponent,anchor)
            
                }
                break
    
        }
    
    }
    
    function processComponent(n1,n2: any, container: any,parentComponent,anchor) {
        if(!n1){
            mountComponent(n2,container,parentComponent,anchor)
        }else{
            updateComponent(n1,n2)
        }
    }
    function updateComponent(n1,n2){// n2是新生成的vnode
        n2.componentInstance = n1.componentInstance
        n2.el = n1.el

        if(shouldUpdateComponent(n1,n2)){
            const instance = n2.componentInstance
            instance.nextVNode = n2
            instance.update()
        }
       
    }
    function mountComponent(initialVNode: any,container,parentComponent,anchor) {
        const instance = initialVNode.componentInstance = createComponentInstance(initialVNode,parentComponent)// 创建 {}空对象
    
        setupComponent(instance) // init {}空对象
        setupRenderEffect(instance,initialVNode,container,anchor) // mount界面 // 界面渲染的入口
    }
    
    function setupRenderEffect(instance: any,initialVNode,container,anchor) {
        instance.update = effect(()=>{// 一个 setupResult，多个 subTree，因为多次都新调用 render
            if(!instance.isMounted){
                const subTree = instance.subTree = instance.render.call(instance.proxy) // render函数 的上下文是 instance.proxy，这导致 subTree 中的 子vnode 的 props 来源可以是 父组件
    
                patch(null,subTree,container,instance,anchor) // special!!
            
                initialVNode.el = subTree.el 

                instance.isMounted = true
            }else{
                if(instance.nextVNode){
                    updateComponentPreRender(instance,instance.nextVNode)
                }
                const subTree = instance.render.call(instance.proxy) 

                const prevSubTree = instance.subTree

                instance.subTree = subTree

                patch(prevSubTree,subTree,container,instance,anchor)

            }
          
        })     
    }
    function updateComponentPreRender(instance,nextVNode){
        instance.vnode = nextVNode
        instance.nextVNode = null

        instance.props = nextVNode.props // 当有新 vnode 就更新 instance.props
    }
    function processElement(n1,n2: any, container: any,parentComponent,anchor) {
        if(!n1){
            mountElement(n2,container,parentComponent,anchor)

        }else{
            patchElement(n1,n2,container,parentComponent)
        }
    }
    
    function patchElement(n1,n2,container,parentComponent){
        console.log('patchElement')
        console.log('n1: ',n1)
        console.log('n2: ',n2)

        const oldProps = n1.props || EMPTY_OBJ
        const newProps = n2.props || EMPTY_OBJ

        const el = n2.el = n1.el // 日后 el 由新 vnode 管理

        patchChildren(n1,n2,el,parentComponent)
        patchProps(el,oldProps,newProps)
    }

    function patchChildren(n1,n2,container,parentComponent){
        const prevShapeFlag = n1.shapeFlag
        const { shapeFlag } = n2
        const c1 = n1.children
        const c2 = n2.children

        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN ){ // ArrayToText
                unmountChildren(n1.children,container)// 把老vnode上的dom从界面上删除
            } 

            if(c1 !== c2){// TextToText
                hostSetElementText(container,c2)
            }
        }else{
            if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){// TextToArray
                hostSetElementText(container,'')

                mountChildren(c2,container,parentComponent,null)

            }else{
                // array diff  array
                patchKeyedChildren(c1,c2,container,parentComponent)
            }
        }
    }

    function patchKeyedChildren(c1,c2,container,parentComponent){
        const l2 = c2.length
        let i = 0
        let e1 = c1.length - 1
        let e2 = l2 - 1

        while(i<= e1 && i <= e2){// 第一阶段：两侧isSameVNodeType的进行patch，直到遇到非isSameVNodeType的停下来
            const n1 = c1[i]
            const n2 = c2[i]

            if(isSameVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,null)// 新vnode夺取老vnode的dom，并基于自己修改dom的prop
            }else{
                break
            }

            i++;// 从左往右移：停在遇到的第一组不一样
        }
        while(i <= e1 && i<= e2){
            const n1 = c1[e1]
            const n2 = c2[e2]

            if(isSameVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,null)
            }else{
                break
            }

            e1--// 因为 c1/c2 length 不同所以要用 e1/e2 两个指针
            e2--
        }
        
        // 把"还有的"新增（新的比老的多）
        if(e1 < i){// e1 i 交叉了
            if(i<= e2){// i e2 没交叉
                const nextPos = i + 1
                const anchor = nextPos < l2 ? c2[nextPos].el : null // 此时已存在 c2[nextPos].el
                while(i<= e2){
                    patch(null,c2[i],container,parentComponent,anchor)// container、anchor 是dom、c2[i]是 vnode
                    i++
                }
                
            }
        }else if(i > e2){//反过来 e1 i 没交叉，i e2 交叉了（老的比新的多）
                while(i<= e1){
                    hostRemove(c1[i].el)// 把老vnode的dom从界面上删除
                    i++
                }
        }else{// 都没交叉，都还有
            const s1 = i
            const s2 = i
            
            const toBePatched = e2 - i + 1;
            let patched = 0
            const keyToNewIndexMap = new Map();// key 是中间商，让老dom找到新vnode，更准确(准确度高于 isSameVNodeType)     

            const newIndexToOldIndexMap = Array.from({length:toBePatched},_=>0)// map // 记录下新vnode对应的老dom (map值为零，表示没有老dom)
            let moved = false
            let maxNewIndexSoFar = 0
            
            for(let i = s2;i <= e2; i++){
                const cur = c2[i]
                keyToNewIndexMap.set(cur.key,i)
            }

            for(let i = s1;i <= e1; i++){// 第二阶段：整理中间老dom (在界面上删除老dom、对有新vnode的老dom进行升级) (实现：循环中间老vnodes)
                const cur = c1[i]

                if(patched>=toBePatched){//?? 假如 旧[div1,div2,div3] 新[div9,div8] 都没有设置key，导致div9被div1、div2为原型升级(patch)了两次，div1没有从界面上删除怎么办??
                    hostRemove(cur.el)
                    continue
                }

                let newIndex
                if(cur.key != null){
                    newIndex = keyToNewIndexMap.get(cur.key)
                }else{
                    for(let j = s2;j <= e2; j++){
                        if(isSameVNodeType(cur,c2[j])){
                            newIndex = j

                            break
                        }
                    }
                }

                if(newIndex === undefined){
                    hostRemove(cur.el)// 在界面上删除老dom
                }else{

                    if(newIndex >= maxNewIndexSoFar){
                        maxNewIndexSoFar = newIndex
                    }else{
                        moved = true
                    }
                    patch(cur,c2[newIndex],container,parentComponent,null)// 新vnode夺取老vnode的dom，并基于自己修改dom的prop
                    patched++

                    newIndexToOldIndexMap[newIndex - s2] = i + 1 // newIndex - s2 从零开始 // 新div9=>旧div2 新div8=>0
                }
            }

            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : [] // 过滤得到dom已经在正确位置的新vnode，相当于把这些vnode做了颜色标记
            let j = increasingNewIndexSequence.length - 1

            for(let i = toBePatched - 1;i >= 0; i--){// 第三阶段：循环新vnode (循环中间新vnode，在正确的位置建新dom、移动新vnode的dom到正确位置)
                // 假如经过第二阶段后中间dom变为由新vnode控制的[b,www,c,a]。
                // 现在第三阶段因为新vnode是[www,a,b,ef,mn,c](所以c、b不要移动，a、www要移动)，从c开始处理：
                // c 是跳过，mn 在 c 后面做新建，ef 在 mn 后面做新建
                // b 也跳过 (b 自然在 ef 后面)
                // a 是从 c 前面移动 b 后面
                // www 从 ef 后面移到 a 后面
                const cur = i + s2 // vnode index
                const curVnode = c2[cur]
                const anchor = cur + 1 < l2 ? c2[cur + 1].el : null

                if(newIndexToOldIndexMap[i] === 0){// 在正确的位置建新dom(并交由新vnode管理)
                    patch(null,curVnode,container,parentComponent,anchor)

                }else {
                    if(moved){
                        if(i === increasingNewIndexSequence[j]){
                            j--;continue;// 当相等时，进行一次消费 // 跳过不需要移动的vnode
                        }
    
                        hostInsert(curVnode.el,container,anchor)// 移动
                    }
                }
            }
        }
        
    }

    function isSameVNodeType(n1,n2){
        return n1.type === n2.type && n1.key === n2.key
    }
    function unmountChildren(children,container){
        for(let i = 0;i<children.length;i++){
            const el = children[i].el

            hostRemove(el,container)
        }
    }
    function patchProps(el: any, oldProps: any, newProps: any) {
        if(oldProps !== newProps){
            for (const key in newProps) {
                const prevProp = oldProps[key]
                const nextProp = newProps[key]
    
                if(prevProp !== nextProp){
                    hostPatchProp(el,key,prevProp,nextProp)
                }
            }
    
            if(oldProps !== EMPTY_OBJ){
                for (const key in oldProps) {
                    if(!(key in newProps)){
                        hostPatchProp(el,key,oldProps[key],null)
        
                    }
        
                }
            }
        
        }
      
    }
    

    function mountElement(vnode: any, container: any,parentComponent,anchor) {
        const el = vnode.el = hostCreateElement(vnode.type) // 这里的 vnode 是element类型 // 日后 el 由 vnode 管理
    
        const { children,shapeFlag } = vnode
    
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            el.textContent = children
        }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
            mountChildren(vnode.children,el,parentComponent,null)
    
        }
    
        const { props } = vnode
        for(const key in props){
            const val = props[key]
    
            hostPatchProp(el,key,null,val)
        }
    
    
        hostInsert(el,container,anchor)
    }
    
    function mountChildren(children: any, container: any,parentComponent,anchor) {
        children.forEach(vnode=>{
            patch(null,vnode,container,parentComponent,anchor)
        })
    }
    
    function processFragment(n1,n2: any, container: any,parentComponent,anchor) {
        mountChildren(n2.children,container,parentComponent,anchor)
    }
    
    function processText(n1,n2: any, container: any) {
        const {children} = n2
    
        const textNode = n2.el =  document.createTextNode(children) // 日后 el 由 vnode 管理
    
        container.append(textNode)
    }
    
    return {
        // 原来 createApp 里调用 render 是固定的
        // 现在不固定了：
        // 所以，需要动态化 createApp ，所以，有了 createAppAPI
        //       需要动态化 render ，所以，有了 createRenderer
        // createRenderer 本可以只 return render
        // 但现在把 调用createAppAPI 的职责给他，这样也可以，导致现在 createRenderer return createApp
        createApp:createAppAPI(render) // cool!! difficult!!
    }    
}


function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = (u + v) >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p[v];
    }
    return result;
  }