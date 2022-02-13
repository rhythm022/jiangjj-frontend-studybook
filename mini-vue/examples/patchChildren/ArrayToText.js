import { h,ref } from "../../lib/mini-vue.esm.js"

const prevChildren = [
    h('div',{},'A'),
    h('div',{},'B'),
]

const nextChildren = 'newChild'
export default {
    name:'ArrayToText',
    setup(){
        const isChange = ref(false)
        window.isChange = isChange

        return {
            isChange
        }
    },
    render(){
        const self = this

        return self.isChange === true
        ? h('div',{},nextChildren)
        : h('div',{},prevChildren)
    }
} 