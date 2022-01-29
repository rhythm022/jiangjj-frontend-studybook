import { h } from "../../lib/mini-vue.esm.js"

export const Foo = {
    setup(props){
        // props 是 reactive readonly
        // props.count
        console.log(props)
    },
    render(){
        return h('div',{},'Foo:' + this.count)
    }
}