/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
 var exclusiveTime = function(n, logs) {
    const res = new Array(n).fill(0)

    let i = 0
    let stack = []
    while(i<logs.length){
        const [id,status,index] = logs[i].split(':')
        const cur = {id,status,index}

        if(cur.status === 'start'){
            stack.push(cur)
        }else{
            const start = stack.pop()
            const duration = cur.index - start.index + 1
            res[cur.id] += duration

            const peekTop = stack[stack.length - 1]
            if(peekTop){
                res[peekTop.id] -= duration
            }
        }
        
        i++
    }

    return res
};