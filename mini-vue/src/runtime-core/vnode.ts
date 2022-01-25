export function createVNode(type,props?,children?){
    const vnode = {
        type,
        props,
        children
    }

    return vnode // vnode 基本有 type props children

}