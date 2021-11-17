import { track, trigger } from "./effect"
import { ReactiveFlags } from "./reactive"



function createGetter(isReadonly = false) {
    return function get(obj, key) {
        const res = Reflect.get(obj, key)

        if(key === ReactiveFlags.IS_REACTIVE)return !isReadonly
        if (!isReadonly) {
            // 收集effect
            track(obj, key)
        }

        return res
    }
}

function createSetter() {
    return function set(obj, key, value) {
        const res = Reflect.set(obj, key, value)

        // 触发effect
        trigger(obj, key)
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