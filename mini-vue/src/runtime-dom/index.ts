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

function insert(el,container,anchor){
    container.insertBefore(el,anchor || null)
}

function remove(el,container){
    const parent = el.parentNode
    if(parent){
        parent.removeChild(el)
    }
}
function setElementText(el,text){
    el.textContent = text
}

// 所以，runtime-dom 在 runtime-core 的上层 !!
// runtime-core 有点像 runtime-dom 的抽象父类
const renderer:any = createRenderer({
    createElement,
    patchProp,
    insert,
    remove,
    setElementText
})

export function createApp(...args){
    return renderer.createApp(...args)
}

export * from '../runtime-core'
