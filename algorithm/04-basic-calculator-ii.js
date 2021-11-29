/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
    let i = 0
    let curNumber = 0
    let preSign = '+'
    s += '#'
    const stack = []
    while(i<s.length){
        const cur = s[i]
        if(cur === ' '){
            i++
            continue
        }
        const isNumber = !isNaN(Number(cur))

        if(isNumber){
            curNumber = curNumber * 10 + Number(cur)
        }else{
            if(preSign === '+'){
                stack.push(curNumber)
            }else if(preSign === '-'){
                stack.push(-curNumber)

            }else if(preSign === '*'){
                stack.push(stack.pop() * curNumber)

            }else{
                stack.push(stack.pop() / curNumber | 0)

            }

            curNumber = 0 
            preSign = cur
        }
        

        i++
    }

    return stack.reduce((res,cur)=>res+=cur,0)

};