import { h } from '../../lib/mini-vue.esm.js'


export const App = {// App 语义：组件
    render(){
        return h("div","hello mini-vue !!" + this.msg)
    },
    setup(){
        return {
            msg:'Hello world'
        }
    }
}