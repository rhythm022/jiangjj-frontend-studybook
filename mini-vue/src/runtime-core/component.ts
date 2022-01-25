export function createComponentInstance(vnode){// vnode 生成 组件实例
    const component = {
        vnode
    }

    return component
}

export function setupComponent(instance){
    // initProps()
    // initSlots()

    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    
}
