import { h } from '../../lib/mini-vue.esm.js'
import ArrayToText from './ArrayToText.js'
import TextToText from './TextToText.js'

export const App = {
    name:'App',
    setup(){
      
    },
    render(){
        return h('div',{tId:1},[
            h('p',{},'主页'),
            // h(ArrayToText),
            h(TextToText)
        ]
        )
    }
}