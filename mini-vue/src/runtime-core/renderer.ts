import { isObject } from "../../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode,container){
    patch(vnode,container)

}

function patch(vnode,container){
    if(typeof vnode.type === 'string'){
        processElement(vnode,container)

    }else if(isObject(vnode.type)){
        processComponent(vnode,container)

    }
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode,container)
}
function mountComponent(vnode: any,container) {
    const instance = createComponentInstance(vnode)
  
    setupComponent(instance)
    setupRenderEffect(instance,container)
}

function setupRenderEffect(instance: any,container) {
    // 返回的 subTree 又是 vnode，vnode 稍后会被 patch(vnode,container)，
    // 如果 h 出来的 vnode 是 element 类型，则会 mountElement 
    const subTree = instance.render() // 调用 render 相当于 开箱

    patch(subTree,container)
}

function processElement(vnode: any, container: any) {
    mountElement(vnode,container)
}

function mountElement(vnode: any, container: any) {
    const el = document.createElement(vnode.type)

    const { children } = vnode

    if(typeof children === 'string'){
        el.textContent = children
    }else if(Array.isArray(children)){
        children.forEach(vnode=>{
            patch(vnode,el)
        })
    }

    const { props } = vnode
    for(const key in props){
        const val = props[key]
        el.setAttribute(key,val)
    }

    container.append(el)
}

