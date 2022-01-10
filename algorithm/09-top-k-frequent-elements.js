/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function(nums, k) {
    const map = new Map()
    for(let i =0 ;i<nums.length;i++){
        const cur = nums[i]
        map.set(cur,map.has(cur) ? map.get(cur)+1 : 1)

    }

    const q = new MaxPriorityQueue({priority:(a)=>a.cnt})
    for(const [val,cnt] of map){
        q.enqueue({val,cnt})
    }
    const res = []
    for(let i =0 ;i<k;i++){
        res.push(q.dequeue().element.val)
    }
    return res
};