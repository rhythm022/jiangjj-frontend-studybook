function readline(){
    return '122321'
}
let inp = readline()
let le = 0
let ri = inp.length - 1
let res = true
while(le<ri){
    if(inp[le] !== inp[ri]){
        res = false
        break
    }
    le++
    ri--
}

console.log(res)
