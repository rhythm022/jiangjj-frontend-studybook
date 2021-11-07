function readline(){
    // return "()"
    // return "()[]{}"
    return "(]"
}

const inp = readline()
let res
const stack = []
for(let i = 0;i<inp.length;i++){
    const cur = inp[i]
    if(cur === '(')stack.push(')')
    if(cur === '{')stack.push('}')
    if(cur === '[')stack.push(']')
    if(cur === ')' || cur === '}' || cur === ']' ){
        const context = stack[stack.length - 1]
        if(context !== cur){
            res = false
            break
        }
        stack.pop()
    }
}
if(res === undefined){
    res = stack.length === 0
}
console.log(res)