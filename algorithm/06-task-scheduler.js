/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
 var leastInterval = function(tasks, n) {

    const hash = {}
    
    tasks.forEach(task=>{
        if(hash[task]=== undefined)hash[task] = 1
        else hash[task]++
    })
    
    const cnt = Object.entries(hash).sort((b,a)=>a[1]-b[1])
    
    
    let max
    let res = 0
    cnt.forEach(([_,c],index)=>{
        if(index === 0){
            res += (c - 1) * (n + 1) + 1
            max = c
        }else{
    if(max === c){
        res++
    }
        }
    })
    
    return Math.max(res,tasks.length)
    };