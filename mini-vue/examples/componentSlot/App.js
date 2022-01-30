import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    setup(){},
    render(){
        const bar = h('div',{},'bar')
        const foo1 = h(Foo,{},{
            slotA:h('p',{},'as slot1A'),
            slotB:h('p',{},'as slot1B'),
        })
        const foo2 = h(Foo,{},{
            slotA:h('p',{},'as slot2A'),
            slotB:h('p',{},'as slot2B')
        })

        return h('div',{},[bar,foo1,foo2])
    }
}