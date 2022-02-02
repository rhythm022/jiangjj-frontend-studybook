import { h,provide,inject } from '../../lib/mini-vue.esm.js'

export const App = {// App 语义：组件
    name:'App',
    setup(){
        provide('sth','sthValFromApp')
        provide('foo','fooValFromApp')
    },
    render(){
     return h(Provider)
    }
}


const Provider = {// App 语义：组件
    name:'App',
    setup(){
        provide('foo','fooFromProvider')

        const foo = inject('foo')

        return {
            foo
        }
    },
    render(){
     return h('div',{},[
         h('div',{},'Provider-foo: ' + this.foo),
         h(Consumer)
     ])
    }
}


const Consumer = {
    setup(){
        const foo  = inject('foo')
        const sth  = inject('sth')
        const baz  = inject('baz','bazDefault')

        return {
            foo,
            sth,
            baz
        }
    },
    render(){
        return h('div',{},
        // 'foo: ' + this.foo + ' sth: ' + this.sth,
        'baz: ' + this.baz
        )
    }
}