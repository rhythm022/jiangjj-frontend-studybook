import { h,getCurrentInstance } from "../../lib/mini-vue.esm.js"

export const Foo = {
    name:'Foo',
    setup(){
        const instance = getCurrentInstance()
        console.log("Foo: ",instance.vnode.type.name)
    },
    render(){
        return h('div',{},'')

    }
}