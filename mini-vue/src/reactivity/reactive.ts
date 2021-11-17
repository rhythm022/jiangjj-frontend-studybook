import { track, trigger } from "./effect"



function createGetter(isReadonly = false) {
    return function get(obj, key) {
        const res = Reflect.get(obj, key)

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

        // TODO 触发effect
        trigger(obj, key)
        return res
    }
}

export function reactive(raw) {// effect为主，reactive是辅助性的提供hook
    return new Proxy(raw, reactiveHandler)
}


export function readonly(raw) {// effect为主，reactive是辅助性的提供hook
    return new Proxy(raw, readonlyHandler)
}

const reactiveHandler = {
    get: createGetter(),
    set: createSetter()
}

const readonlyHandler = {
    get: createGetter(true),
    set(obj, key, value) {
        return true
    }
}