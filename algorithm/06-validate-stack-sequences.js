/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
 var validateStackSequences = function(pushed, popped) {

    let j = 0
        const stack = []
        for(let i = 0 ;i<pushed.length;i++){
            const cur = pushed[i]
            stack.push(cur)
            while(stack.length && stack[stack.length -1] === popped[j]){
                stack.pop()
                j++
            }
        }
    
        return !stack.length && j === popped.length
    };