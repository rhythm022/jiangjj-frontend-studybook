import { h,renderSlots } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(){},
    render(){
        const p = h('p',{},'p-foo')


        return h('div',{},[
            renderSlots(this.$slots,'slotA'),
            p,
            renderSlots(this.$slots,'slotB')
        ])
    }
}