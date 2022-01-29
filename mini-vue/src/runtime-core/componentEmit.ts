import {  capitalize } from "../../shared/index"

export function emit(instance,event,...args){
    const { props } = instance
    const toHandlerKey = (str:string)=>{
        return str ? 'on' + capitalize(str) : ''
    }

    const handlerName = toHandlerKey(event)

    const handler = props[handlerName]
    handler && handler(...args)

}