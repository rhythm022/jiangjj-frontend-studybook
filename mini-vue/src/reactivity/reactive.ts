import { track, trigger } from "./effect"

export function reactive(raw){// effect为主，reactive是辅助性的提供hook
    return new Proxy(raw,{
        get(obj,key){
            const res = Reflect.get(obj,key)

            // 收集effect
            track(obj,key)
            return res
        },
        set(obj,key,value){
            const res = Reflect.set(obj,key,value)

            // TODO 触发effect
            trigger(obj,key)
            return res
        }
    })
}