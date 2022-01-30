import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    setup(){},
    render(){
        const bar = h('div',{},'bar')

        // cool!! 所以 传给组件的 slot 是 生成vnode的函数，而非 vnode
        const foo1 = h(Foo,{},{
            slotA:({feat1}) => h('p',{},'slot1A use ' + feat1),
            slotB:({feat2}) => h('p',{},'slot1B use ' + feat2),
        })
        const foo2 = h(Foo,{},{
            slotA:() => h('p',{},'slot2A'),
            slotB:() => h('p',{},'slot2B')
        })

        return h('div',{},[bar,foo1,foo2])
    }
}