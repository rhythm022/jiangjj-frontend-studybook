import { getCurrentInstance } from "./component";

export function provide(key,value){
    const cmpIns:any = getCurrentInstance()
    if(cmpIns){
        const {provides} = cmpIns

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