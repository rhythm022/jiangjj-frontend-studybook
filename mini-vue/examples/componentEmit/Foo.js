import { h } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(props,{emit}){
        // props 是 reactive readonly

        const emitAdd = ()=>{
            emit('add',1)
        }

        return {
            emitAdd
        }
    },
    render(){
       const btn = h(
           'button',
           {
               onClick:this.emitAdd
           },
           '点我'
       )

       const foo = h('p',{},'哈哈哈哈')

       return h('div',{},[btn,foo])
    }
}