import { h,renderSlots } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(){},
    render(){
        const p = h('p',{},'p-foo')


        return h('div',{},[p,renderSlots(this.$slots)])
    }
}