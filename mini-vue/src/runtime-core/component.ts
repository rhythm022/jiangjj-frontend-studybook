import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { publicInstanceProxyHandler } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode,parent){// 组件是 vnode 的一类，用户定义的组件被磨成 vnode 。组件类型的 vnode 生成 组件实例
   console.log('parent: ',parent)
    const instance = {
        vnode,
        type:vnode.type,
        setupState:{},
        props:{}, // 和 vnode 的 props 是两码事
        slots:{},
        provides:{},
        parent,
        emit:()=>{}
    }

    instance.emit = emit.bind(null,instance) as any // init instance.emit

    return instance
}

export function setupComponent(instance){
    initProps(instance,instance.vnode.props) // init instance.props
    initSlots(instance,instance.vnode.children) // init instance.slots
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    const Component = instance.vnode.type

    instance.proxy = new Proxy( // init instance.proxy
        {instance},
        publicInstanceProxyHandler
    )

    setCurrentInstance(instance)
    const setupResult = Component.setup(shallowReadonly(instance.props),{// exec initFunc
        emit:instance.emit
    })
    setCurrentInstance(null)
    
    handleSetupResult(instance,setupResult)
}
function handleSetupResult(instance,setupResult: any) {
    // funciton object
    // TODO function
    if(typeof setupResult === 'object'){
        instance.setupState = setupResult // init instance.setupState
    }

    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
    const Component = instance.vnode.type

    instance.render = Component.render // init instance.render

}

let currentInstance = null
export function getCurrentInstance(){
    return currentInstance 
}

function setCurrentInstance(current){
    currentInstance = current
}
