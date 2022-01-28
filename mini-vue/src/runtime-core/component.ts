export function createComponentInstance(vnode){// vnode 生成 组件实例
    const component = {
        vnode,
        type:vnode.type,
        setupState:{}
    }

    return component
}

export function setupComponent(instance){
    // initProps()
    // initSlots()

    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    // 这个 Component 就是一开始用户定义的那个组件, 现在拿到他
    // 这个 Component 一开始被包在 vnode 中, vnode 然后又被包在instance,现在解放出来
    const Component = instance.vnode.type 

    instance.proxy = new Proxy(
        {},// ctx // raw
        {
            get(raw,key){
                const { setupState,vnode } = instance

                if(key in setupState){
                    return setupState[key]
                }

                if(key === 'el'){
                    return vnode.el
                }
            }
        }
    )

    const { setup } = Component

    if(setup){
        const setupResult = setup()

        handleSetupResult(instance,setupResult)
    }
}
function handleSetupResult(instance,setupResult: any) {
    // funciton object
    //TODO function

    if(typeof setupResult === 'object'){
        instance.setupState = setupResult // 把 setupResult 注入\放到 组件上下文 中 
    }

    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
    const Component = instance.vnode.type 

    const { render } = Component

    if(render){
        instance.render = render // 把组件的 render 扔到 组件实例
    }
}

