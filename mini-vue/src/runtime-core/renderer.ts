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
    const instance = createComponentInstance(vnode)// 可以理解为 createComponentInstance 返回了一个空对象 {}
  
    setupComponent(instance) // 把 setup结果 和 render函数 放入 {}空对象
    setupRenderEffect(instance,container) // mount界面
}

function setupRenderEffect(instance: any,container) {
    // 返回的 subTree 又是 vnode，vnode 稍后会被 patch(vnode,container)，
    // 如果 h 出来的 vnode 是 element 类型，则会 mountElement 
    const subTree = instance.render.call(instance.proxy) // 调用 render 相当于 开箱 

    patch(subTree,container)// cool!! 目前来看，组件实例只是给它的 vnode(subTree) 提供环境，环境是 instance.proxy(setup结果)
    
    instance.vnode.el = subTree.el
}

function processElement(vnode: any, container: any) {
    mountElement(vnode,container)
}

function mountElement(vnode: any, container: any) {
    const el = vnode.el = document.createElement(vnode.type) // 这里的 vnode 是 subTree

    const { children,shapeFlag } = vnode

    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
        el.textContent = children
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
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

