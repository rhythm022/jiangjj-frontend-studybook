import { h,provide,inject } from '../../lib/mini-vue.esm.js'

export const App = {// App 语义：组件
    name:'App',
    setup(){
    },
    render(){
     return h(Provider)
    }
}


const Provider = {// App 语义：组件
    name:'App',
    setup(){
        provide('foo','fooVal')
        provide('bar','barVal')
    },
    render(){
     return h(Consumer)
    }
}


const Consumer = {
    setup(){
        const foo  = inject('foo')
        const bar  = inject('bar')

        return {
            foo,
            bar
        }
    },
    render(){
        return h('div',{},
        'foo: ' + this.foo + ' bar: ' + this.bar,
        )
    }
}