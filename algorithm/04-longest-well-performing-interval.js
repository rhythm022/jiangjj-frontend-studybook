/**
 * @param {number[]} hours
 * @return {number}
 */
 var longestWPI = function(hours) {
    let hash = new  Map()
    let sum = 0
    let res = 0
    for(let i = 0;i<hours.length;i++){
        const cur = hours[i]
        sum += cur >8 ? 1 : -1
    
        if(sum>0)res = i+1
        else{
            if(!hash.has(sum))hash.set(sum,i)
    
            if(hash.has(sum-1)){
                res = Math.max(res,i - hash.get(sum-1))
            }
        }
    }
    
    return res
    };