import {reactiveHandler,readonlyHandler} from './baseHandlers'

export function reactive(raw) {// effect为主，reactive是辅助性的提供hook
    return createActiveObject(raw, reactiveHandler)
}


export function readonly(raw) {// effect为主，reactive是辅助性的提供hook
    return createActiveObject(raw, readonlyHandler)
}

function createActiveObject(raw, handler){
    return new Proxy(raw, handler)
}

export function isReactive(target){
    return target['is_reactive']
}