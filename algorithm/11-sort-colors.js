/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function(nums) {
    let le = 0
    let ri = nums.length - 1
    for(let i = 0 ;i<=ri;i++){
        const cur = nums[i]

        if(cur === 2){
            [nums[ri],nums[i]] =[nums[i],nums[ri]]
            ri--
            i--
        }else if(cur === 0){
            [nums[le],nums[i]] =[nums[i],nums[le]]
            le++
        }
    }
    
};