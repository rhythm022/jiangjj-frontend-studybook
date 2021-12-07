import { hasChanged } from '../../shared';
import {trackEffects,triggerEffects,isTracking} from './effect'
class RefImp{
    private _value: any;
    public dep// 不同于之前把dep放在effect.ts
    constructor(value){
        this._value = value
        this.dep = new Set()
    }

    get value(){
        trackRefValue(this)
        return this._value
    }
    set value(value){
        if(!hasChanged(value,this._value))return 
        this._value = value
        triggerEffects(this.dep)
    }
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffects(ref.dep)

    }


}
export function ref(value) {
    return new RefImp(value)
}