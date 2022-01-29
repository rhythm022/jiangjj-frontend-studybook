import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './Foo.js'


export const App = {// App 语义：组件
    setup(){
    
    },
    render(){
        return h("div",{},[h(Foo,{count:1}) ])
    }
}