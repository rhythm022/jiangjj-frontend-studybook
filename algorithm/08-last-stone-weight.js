/**
 * @param {number[]} stones
 * @return {number}
 */
 var lastStoneWeight = function(stones) {
    while(stones.length >=2){
        stones.sort((a,b)=>a-b)
        const x = stones.pop()
        const y = stones.pop()
        stones.push(x - y)
    
    }
    return stones[0]
    };