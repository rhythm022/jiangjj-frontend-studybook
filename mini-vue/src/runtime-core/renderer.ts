import { EMPTY_OBJ, isObject } from "../../shared/index"
import { ShapeFlags } from "../../shared/ShapeFlags"
import { effect } from "../reactivity"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment,Text } from "./vnode"


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
        mountComponent(n2,container,parentComponent,anchor)
    }
    function mountComponent(initialVNode: any,container,parentComponent,anchor) {
        const instance = createComponentInstance(initialVNode,parentComponent)// 创建 {}空对象
    
        setupComponent(instance) // init {}空对象
        setupRenderEffect(instance,initialVNode,container,anchor) // mount界面 // 界面渲染的入口
    }
    
    function setupRenderEffect(instance: any,initialVNode,container,anchor) {
        effect(()=>{// 一个 setupResult，多个 subTree，因为多次都新调用 render
            if(!instance.isMounted){
                const subTree = instance.subTree = instance.render.call(instance.proxy) // render函数 的上下文是 instance.proxy，这导致 subTree 中的 子vnode 的 props 来源可以是 父组件
    
                patch(null,subTree,container,instance,anchor) // special!!
            
                initialVNode.el = subTree.el

                instance.isMounted = true
            }else{
                const subTree = instance.render.call(instance.proxy) 

                const prevSubTree = instance.subTree

                instance.subTree = subTree

                patch(prevSubTree,subTree,container,instance,anchor)

            }
          
        })     
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

        const el = n2.el = n1.el

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
                unmountChildren(n1.children,container)
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

        while(i<= e1 && i <= e2){
            const n1 = c1[i]
            const n2 = c2[i]

            if(isSameVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,null)
            }else{
                break
            }

            i++;// 从左往右移：停在遇到的第一组不一样。此时假如不一样是因为老数组跑完了(交叉了)，新数组还有(没交叉)。就要把"还有的"新增
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
                    patch(null,c2[i],container,parentComponent,anchor)// anchor 是兄弟实 dom、container 是父实dom、c2[i]是 vnode
                    i++
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
        const el = vnode.el = hostCreateElement(vnode.type) // 这里的 vnode 是element类型
    
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
    
        const textNode = n2.el =  document.createTextNode(children)
    
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

