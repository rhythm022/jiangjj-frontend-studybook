class RefImp{
    private _value: any;
    constructor(value){
        this._value = value
    }

    get value(){
        return this._value
    }
    // set value(){

    // }
}


export function ref(value) {
    return new RefImp(value)
}