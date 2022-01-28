const publicPropertiesMap = {
    $el : instance => instance.vnode.el
}



export const publicInstanceProxyHandler =    {
    get({instance},key){
        const { setupState } = instance

        if(key in setupState){
            return setupState[key]
        }

        const publicGetter = publicPropertiesMap[key]
        if(publicGetter){
            return publicGetter(instance)
            
        }
     
    }
}