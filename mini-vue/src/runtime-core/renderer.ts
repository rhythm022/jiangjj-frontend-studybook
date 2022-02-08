import { isObject } from "../../shared/index"
import { ShapeFlags } from "../../shared/ShapeFlags"
import { effect } from "../reactivity"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment,Text } from "./vnode"


export function createRenderer(options){
    const {
        createElement,
        patchProp,
        insert
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
            patchElement(n1,n2,container)
        }
    }
    
    function patchElement(n1,n2,container){
        console.log('patchElement')
        console.log('n1: ',n1)
        console.log('n2: ',n2)
    }

    function mountElement(vnode: any, container: any,parentComponent) {
        const el = vnode.el = createElement(vnode.type) // 这里的 vnode 是element类型
    
        const { children,shapeFlag } = vnode
    
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            el.textContent = children
        }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
            mountChildren(vnode,el,parentComponent)
    
        }
    
        const { props } = vnode
        for(const key in props){
            const val = props[key]
    
            patchProp(el,key,val)
        }
    
    
        insert(el,container)
    }
    
    function mountChildren(vnode: any, container: any,parentComponent) {
        vnode.children.forEach(vnode=>{
            patch(null,vnode,container,parentComponent)
        })
    }
    
    function processFragment(n1,n2: any, container: any,parentComponent) {
        mountChildren(n2,container,parentComponent)
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

