import { h,getCurrentInstance } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    name:'App',
    setup(){
        const cmpIns = getCurrentInstance()
        console.log("App: ",cmpIns.type.name)
    },
    render(){
     return h('div',{},[h('p',{},''),h(Foo)])
    }
}