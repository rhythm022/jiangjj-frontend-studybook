import { ShapeFlags } from "../../shared/ShapeFlags"

export function createVNode(type,props?,children?){
    const vnode = {
        type,
        props,
        children,
        shapeFlag:getShapeFlag(type),
        el:null
    }

    if(typeof children === 'string'){
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
        
    }else if(Array.isArray(children)){
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN

    }

    return vnode // vnode 基本有 type props children

}


function getShapeFlag(type){
    if(typeof type === 'string'){
        return ShapeFlags.ELEMENT
    }else{
        return ShapeFlags.STATEFUL_COMPONENT
    }
}