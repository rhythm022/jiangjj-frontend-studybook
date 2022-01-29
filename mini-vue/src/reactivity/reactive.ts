import { isObject } from '../../shared/index'
import {reactiveHandler,readonlyHandler,shallowReadonlyHandler} from './baseHandlers'
export const enum ReactiveFlags{
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}
export function reactive(raw) {// effect为主，reactive是辅助性的提供hook
    return createReactiveObject(raw, reactiveHandler)
}
export function shallowReadonly(raw) {
    return createReactiveObject(raw, shallowReadonlyHandler)
    
}

export function readonly(raw) {// effect为主，reactive是辅助性的提供hook
    return createReactiveObject(raw, readonlyHandler)
}

function createReactiveObject(raw, handler){
    if(!isObject(raw)){
       return  console.warn(`target ${raw} 必须是一个对象`)
    }
    return new Proxy(raw, handler)
}

export function isReactive(target){
    return !!target[ReactiveFlags.IS_REACTIVE]
}


export function isReadonly(target){
    return !!target[ReactiveFlags.IS_READONLY]
}
export function isProxy(target) {
    return isReactive(target) || isReadonly(target)
}