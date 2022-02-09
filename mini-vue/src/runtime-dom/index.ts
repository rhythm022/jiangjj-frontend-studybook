import { createRenderer } from '../runtime-core'

function createElement(type){
    return document.createElement(type)
}


function patchProp(el,key,prevVal,newVal){
    const isOn = (key:string) => /^on[A-Z]/.test(key)

        if(isOn(key)){
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event,newVal)
        }else{
            if(newVal === undefined || newVal === null){
                el.removeAttribute(key)

            }else{
                el.setAttribute(key,newVal)

            }
        }
}

function insert(el,container){
    container.append(el)
}


// 所以，runtime-dom 在 runtime-core 的上层 !!
// runtime-core 有点像 runtime-dom 的抽象父类
const renderer:any = createRenderer({
    createElement,
    patchProp,
    insert,
})

export function createApp(...args){
    return renderer.createApp(...args)
}

export * from '../runtime-core'
