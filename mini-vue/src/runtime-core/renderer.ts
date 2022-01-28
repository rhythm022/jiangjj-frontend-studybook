import { isObject } from "../../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode,container){
    patch(vnode,container)

}

function patch(vnode,container){ // 职责：根据 vnode 更新(mount) container位置 的界面
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
    const instance = createComponentInstance(vnode)// 可以理解为 createComponentInstance 返回了一个空对象 {}
  
    setupComponent(instance) // 把 setup结果 和 render函数 放入 {}空对象
    setupRenderEffect(instance,container) // mount界面
}

function setupRenderEffect(instance: any,container) {
    // 返回的 subTree 又是 vnode，vnode 稍后会被 patch(vnode,container)，
    // 如果 h 出来的 vnode 是 element 类型，则会 mountElement 
    const subTree = instance.render() // 调用 render 相当于 开箱 

    patch(subTree,container)// cool!! 目前来看，组件只是给它的 vnode 提供环境，环境是 setup结果 
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
        mountChildren(vnode,el)
  
    }

    const { props } = vnode
    for(const key in props){
        const val = props[key]
        el.setAttribute(key,val)
    }

    container.append(el)
}

function mountChildren(vnode: any, container: any) {
    vnode.children.forEach(vnode=>{
        patch(vnode,container)
    })
}

