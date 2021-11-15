const objMap = new Map()
let activeEffect
class ReactiveEffect{
    private _fn: any
    constructor(fn){
        this._fn = fn
    }

    run(){
        activeEffect = this
        this._fn()
        // activeEffect = null//???
    }
}

export function track(obj,key){
    let keysMap = objMap.get(obj)
    if(!keysMap){
        keysMap = new Map()
        objMap.set(obj,keysMap)
    }

    let dep = keysMap.get(key)
    if(!dep){
        dep = new Set()
        keysMap.set(key,dep)
    }
    dep.add(activeEffect)

}
export function trigger(obj,key) {
    let keysMap = objMap.get(obj)
    let dep = keysMap.get(key)
    for(const effect of dep){
        effect.run()
    }
}
export function effect(fn){
    const _effect = new ReactiveEffect(fn)

    _effect.run()
}