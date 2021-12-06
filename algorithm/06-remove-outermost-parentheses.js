/**
 * @param {string} s
 * @return {string}
 */
 var removeOuterParentheses = function(s) {
    let stack = 0
    let res = []
    for(let i = 0;i<s.length;i++){
        const cur = s[i]

        if(cur === '('){
            if(stack !== 0){
                res.push('(')
            }
            stack++
        }else if(cur === ')'){
            if(stack !== 1){
                res.push(')')
            }
            stack--
        }
    }

    return res.join("")
};