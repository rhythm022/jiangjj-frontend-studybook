import { hasChanged } from '../../shared';
import {trackEffects,triggerEffects} from './effect'
class RefImp{
    private _value: any;
    public dep// 不同于之前把dep放在effect.ts
    constructor(value){
        this._value = value
        this.dep = new Set()
    }

    get value(){
        trackEffects(this.dep)
        return this._value
    }
    set value(value){
        if(!hasChanged(value,this._value))return 
        this._value = value
        triggerEffects(this.dep)
    }
}


export function ref(value) {
    return new RefImp(value)
}