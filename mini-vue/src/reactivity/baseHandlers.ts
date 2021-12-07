import { extend, isObject } from "../../shared"
import { track, trigger } from "./effect"
import { ReactiveFlags,reactive,readonly } from "./reactive"



function createGetter(isReadonly = false,isShallow = false) {
    return function get(obj, key) {
        if(key === ReactiveFlags.IS_REACTIVE)return !isReadonly
        if(key === ReactiveFlags.IS_READONLY)return isReadonly

        const res = Reflect.get(obj, key)

        if(isShallow && isReadonly)return res
        if (!isReadonly) {
            // 收集effect
            // console.log('track',obj,key)
            track(obj, key)
        }

        if(isObject(res)){
            return isReadonly ? readonly(res) : reactive(res)// get obj.key.key 时先 get obj.key，才惰性的转换成reactive对象 
        }
        return res
    }
}

function createSetter() {
    return function set(obj, key, value) {
        const res = Reflect.set(obj, key, value)
        // console.log('======trigger start=======')
        // 触发effect
        trigger(obj, key)
        // console.log('======trigger end=========')

        return res
    }
}

const get = createGetter()
const set = createSetter()
export const reactiveHandler = {
    get,
    set
}

const readonlyGet = createGetter(true)

export const readonlyHandler = {
    get: readonlyGet,
    set(obj, key, value) {
        console.warn(`can not set readonly object ${obj} ${key}`)
        return true
    }
}
const shallowReadonlyGet = createGetter(true,true)

export const shallowReadonlyHandler =extend({},readonlyHandler,{
    get: shallowReadonlyGet,

})