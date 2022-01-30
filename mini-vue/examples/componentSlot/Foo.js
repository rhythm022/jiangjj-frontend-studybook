import { h,renderSlots } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(){},
    render(){
        const p = h('p',{},'p-foo')


        return h('div',{},[
            renderSlots(this.$slots,'slotA',{
                feat1:'inner_sth'
            }),
            p,
            renderSlots(this.$slots,'slotB',{
                feat2:'inner_sth'

            })
        ])
    }
}