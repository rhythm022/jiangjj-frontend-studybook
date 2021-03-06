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
        patch(null,vnode,container,null)
    
    }
    // n1 => 老的
    // n2 => 新的
    function patch(n1,n2,container,parentComponent){ // 职责：根据 n2 更新(mount) container位置 的界面
        const { shapeFlag,type } = n2
    
        switch (type){
            case Fragment:
                processFragment(n1,n2,container,parentComponent)
    
                break
            case Text:
                processText(n1,n2,container)
    
                break
            default:
                if(shapeFlag & ShapeFlags.ELEMENT){
                    processElement(n1,n2,container,parentComponent)
            
                }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
                    processComponent(n1,n2,container,parentComponent)
            
                }
                break
    
        }
    
    }
    
    function processComponent(n1,n2: any, container: any,parentComponent) {
        mountComponent(n2,container,parentComponent)
    }
    function mountComponent(initialVNode: any,container,parentComponent) {
        const instance = createComponentInstance(initialVNode,parentComponent)// 创建 {}空对象
    
        setupComponent(instance) // init {}空对象
        setupRenderEffect(instance,initialVNode,container) // mount界面 // 界面渲染的入口
    }
    
    function setupRenderEffect(instance: any,initialVNode,container) {
        effect(()=>{// 一个 setupResult，多个 subTree，因为多次都新调用 render
            if(!instance.isMounted){
                const subTree = instance.subTree = instance.render.call(instance.proxy) // render函数 的上下文是 instance.proxy，这导致 subTree 中的 子vnode 的 props 来源可以是 父组件
    
                patch(null,subTree,container,instance) // special!!
            
                initialVNode.el = subTree.el

                instance.isMounted = true
            }else{
                const subTree = instance.render.call(instance.proxy) 

                const prevSubTree = instance.subTree

                instance.subTree = subTree

                patch(prevSubTree,subTree,container,instance)

            }
          
        })     
    }
    
    function processElement(n1,n2: any, container: any,parentComponent) {
        if(!n1){
            mountElement(n2,container,parentComponent)

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

                mountChildren(c2,container,parentComponent)

            }
        }
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
    

    function mountElement(vnode: any, container: any,parentComponent) {
        const el = vnode.el = hostCreateElement(vnode.type) // 这里的 vnode 是element类型
    
        const { children,shapeFlag } = vnode
    
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            el.textContent = children
        }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
            mountChildren(vnode.children,el,parentComponent)
    
        }
    
        const { props } = vnode
        for(const key in props){
            const val = props[key]
    
            hostPatchProp(el,key,null,val)
        }
    
    
        hostInsert(el,container)
    }
    
    function mountChildren(children: any, container: any,parentComponent) {
        children.forEach(vnode=>{
            patch(null,vnode,container,parentComponent)
        })
    }
    
    function processFragment(n1,n2: any, container: any,parentComponent) {
        mountChildren(n2.children,container,parentComponent)
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

