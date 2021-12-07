import {reactiveHandler,readonlyHandler,shallowReadonlyHandler} from './baseHandlers'
export const enum ReactiveFlags{
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}
export function reactive(raw) {// effect为主，reactive是辅助性的提供hook
    return createActiveObject(raw, reactiveHandler)
}
export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandler)
    
}

export function readonly(raw) {// effect为主，reactive是辅助性的提供hook
    return createActiveObject(raw, readonlyHandler)
}

function createActiveObject(raw, handler){
    return new Proxy(raw, handler)
}

export function isReactive(target){
    return !!target[ReactiveFlags.IS_REACTIVE]
}


export function isReadonly(target){
    return !!target[ReactiveFlags.IS_READONLY]
}