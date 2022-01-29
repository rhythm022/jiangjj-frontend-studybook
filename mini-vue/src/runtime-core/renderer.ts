import { isObject } from "../../shared/index"
import { ShapeFlags } from "../../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode,container){
    patch(vnode,container)

}

function patch(vnode,container){ // 职责：根据 vnode 更新(mount) container位置 的界面
    const { shapeFlag } = vnode

    if(shapeFlag & ShapeFlags.ELEMENT){
        processElement(vnode,container)

    }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
        processComponent(vnode,container)

    }
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode,container)
}
function mountComponent(vnode: any,container) {
    const instance = createComponentInstance(vnode)// 创建 {}空对象

    setupComponent(instance) // init {}空对象
    setupRenderEffect(instance,container) // mount界面
}

function setupRenderEffect(instance: any,container) {
    const subTree = instance.render.call(instance.proxy) // render函数 的上下文是 instance.proxy，这导致 subTree 中的 子vnode 的 props 来源可以是 父组件

    patch(subTree,container)

    instance.vnode.el = subTree.el
}

function processElement(vnode: any, container: any) {
    mountElement(vnode,container)
}

function mountElement(vnode: any, container: any) {
    const el = vnode.el = document.createElement(vnode.type) // 这里的 vnode 是element类型

    const { children,shapeFlag } = vnode

    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
        el.textContent = children
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
        mountChildren(vnode,el)

    }

    const { props } = vnode
    const isOn = (key:string) => /^on[A-Z]/.test(key)
    for(const key in props){
        const val = props[key]
        if(isOn(key)){
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event,val)
        }
        el.setAttribute(key,val)
    }

    container.append(el)
}

function mountChildren(vnode: any, container: any) {
    vnode.children.forEach(vnode=>{
        patch(vnode,container)
    })
}

