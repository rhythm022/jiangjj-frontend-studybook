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


export function inject(key){
    const cmpIns:any = getCurrentInstance()
    if(cmpIns){
        const parentProvides = cmpIns.parent.provides
       
        return parentProvides[key]

    }
}