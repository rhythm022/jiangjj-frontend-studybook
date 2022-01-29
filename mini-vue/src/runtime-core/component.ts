import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { publicInstanceProxyHandler } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode){// 组件是 vnode 的一类，用户定义的组件被磨成 vnode 。组件类型的 vnode 生成 组件实例
    const instance = {
        vnode,
        type:vnode.type,
        setupState:{},
        props:{}, // 和 vnode 的 props 是两码事
        slots:{},
        emit:()=>{}
    }

    instance.emit = emit.bind(null,instance) as any // init instance.emit

    return instance
}

export function setupComponent(instance){
    initProps(instance,instance.vnode.props) // init instance.props
    initSlots(instance,instance.vnode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    const Component = instance.vnode.type

    instance.proxy = new Proxy( // init instance.proxy
        {instance},
        publicInstanceProxyHandler
    )

    const setupResult = Component.setup(shallowReadonly(instance.props),{// exec initFunc
        emit:instance.emit
    })
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

