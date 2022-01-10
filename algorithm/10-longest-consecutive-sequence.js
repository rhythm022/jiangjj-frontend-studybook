/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    const hash = {}
    let = res = 0
    for(let i = 0;i<nums.length;i++){
        const cur = nums[i]
        hash[cur] = true
    }
    for(let i = 0;i<nums.length;i++){
        const cur = nums[i]
        if(!hash[cur-1]){
            let cnt = 0
            let x = cur
            while(hash[x++])cnt++
            res = Math.max(res,cnt)


        }
    }
    return res
};