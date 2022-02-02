import { isObject } from "../../shared/index"
import { ShapeFlags } from "../../shared/ShapeFlags"
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
        patch(vnode,container,null)
    
    }
    
    function patch(vnode,container,parentComponent){ // 职责：根据 vnode 更新(mount) container位置 的界面
        const { shapeFlag,type } = vnode
    
        switch (type){
            case Fragment:
                processFragment(vnode,container,parentComponent)
    
                break
            case Text:
                processText(vnode,container)
    
                break
            default:
                if(shapeFlag & ShapeFlags.ELEMENT){
                    processElement(vnode,container,parentComponent)
            
                }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
                    processComponent(vnode,container,parentComponent)
            
                }
                break
    
        }
    
    }
    
    function processComponent(vnode: any, container: any,parentComponent) {
        mountComponent(vnode,container,parentComponent)
    }
    function mountComponent(vnode: any,container,parentComponent) {
        const instance = createComponentInstance(vnode,parentComponent)// 创建 {}空对象
    
        setupComponent(instance) // init {}空对象
        setupRenderEffect(instance,container) // mount界面
    }
    
    function setupRenderEffect(instance: any,container) {
        const subTree = instance.render.call(instance.proxy) // render函数 的上下文是 instance.proxy，这导致 subTree 中的 子vnode 的 props 来源可以是 父组件
    
        patch(subTree,container,instance) // special!!
    
        instance.vnode.el = subTree.el
    }
    
    function processElement(vnode: any, container: any,parentComponent) {
        mountElement(vnode,container,parentComponent)
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
            patch(vnode,container,parentComponent)
        })
    }
    
    function processFragment(vnode: any, container: any,parentComponent) {
        mountChildren(vnode,container,parentComponent)
    }
    
    function processText(vnode: any, container: any) {
        const {children} = vnode
    
        const textNode = vnode.el =  document.createTextNode(children)
    
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

