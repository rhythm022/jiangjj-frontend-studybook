/**
 * @param {string} s
 * @return {string}
 */
 var minRemoveToMakeValid = function(s) {
    const stack = []
    const removing = []
    
    for(let i = 0;i<s.length;i++){
        const cur = s[i]
        if(cur === '('){
            stack.push(i)
        }else if(cur === ')'){
            if(!stack.length) {
                removing.push(i)
            }else{
                stack.pop()
            }
                    
        }
    
    }
        const a =  s.split('')
        stack.forEach(index=>{
                a[index] = ''
           
        })
      removing.forEach(index=>{
                a[index] = ''
           
        })
    
        return a.join('')
    
    };