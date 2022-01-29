import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    setup(){},
    render(){
        const bar = h('div',{},'bar')
        const foo = h(Foo,{},h('p',{},'as slot'))

        return h('div',{},[bar,foo])
    }
}