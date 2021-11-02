import { observe } from './j-reactive.js'
class Vue{
    constructor(options){
        this.$options = options
        this.$data = options.data

        observe(this.$data)
    }
}

export default Vue