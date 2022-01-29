import { h } from '../../lib/mini-vue.esm.js'


export const App = {// App 语义：组件
    render(){
        window.self = this
        return h("div",{
            id:'root',
            class:['red','hard'],
            onClick:function onClick() {
                console.log('click')
            }
        },
        "hello mini-vue !!" + this.msg,
        // [
        //     h("p",{class:"red"},"hi"),
        //     h("p",{class:"blue"},"jiangjj")
        // ]
        )
    },
    setup(){
        return {
            msg:'Hello world'
        }
    }
}