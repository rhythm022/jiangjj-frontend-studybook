const publicPropertiesMap = {
    $el : instance => instance.vnode.el
}



export const publicInstanceProxyHandler =    {
    get({instance},key){
        const { setupState,props } = instance

        const hasOwn = (target,key)=> Object.prototype.hasOwnProperty.call(target,key)
        
        if(hasOwn(setupState,key)){
            return setupState[key]

        }else if(hasOwn(props,key)){
            return props[key]

        }

        const publicGetter = publicPropertiesMap[key]
        if(publicGetter){
            return publicGetter(instance)
            
        }
     
    }
}