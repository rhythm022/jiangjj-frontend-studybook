export function reactive(raw){
    return new Proxy(raw,{
        get(target,key){
            const res = Reflect.get(target,key)

            // TODO 收集effect
            return res
        },
        set(target,key,value){
            const res = Reflect.set(target,key,value)

            // TODO 触发effect
            return res
        }
    })
}