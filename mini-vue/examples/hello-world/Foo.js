import { h } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(props){
        // props 是 reactive readonly
        // props.count
        props.count++ // 用于测试
    },
    render(){
        return h('div',{},'Foo:' + this.count)
    }
}