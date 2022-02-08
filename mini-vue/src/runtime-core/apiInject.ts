import { getCurrentInstance } from "./component";

export function provide(key,value){
    const cmpIns:any = getCurrentInstance()
    if(cmpIns){
        let {provides} = cmpIns
        const parentProvides = cmpIns.parent ? cmpIns.parent.provides : null

        if(provides === parentProvides){
            provides = cmpIns.provides = Object.create(parentProvides) // cool!!
        }

        provides[key] = value
    }
}


export function inject(key,defaultValue){
    const cmpIns:any = getCurrentInstance()
    if(cmpIns){
        const parentProvides = cmpIns.parent.provides
       
        if(key in parentProvides){
            return parentProvides[key]

        }else if(defaultValue){
            if(typeof defaultValue === 'function'){
                return defaultValue()
            }
            return defaultValue
        }

    }
}