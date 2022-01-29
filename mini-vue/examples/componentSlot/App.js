import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    setup(){},
    render(){
        const bar = h('div',{},'bar')
        const foo1 = h(Foo,{},h('p',{},'as slot1'))
        const foo2 = h(Foo,{},[h('p',{},'as slot2.1'),h('p',{},'as slot2.2')])

        return h('div',{},[bar,foo1,foo2])
    }
}