import { createRenderer } from '../runtime-core'

function createElement(type){
    return document.createElement(type)
}


function patchProp(el,key,val){
    const isOn = (key:string) => /^on[A-Z]/.test(key)

        if(isOn(key)){
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event,val)
        }
        el.setAttribute(key,val)
}

function insert(el,container){
    container.append(el)
}

const renderer = createRenderer({
    createElement,
    patchProp,
    insert,
})