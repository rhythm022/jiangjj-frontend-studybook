/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var exchange = function(nums) {
    let mid = 0
    for(let i = 0 ;i<nums.length;i++){

        if(nums[i] % 2){
            [nums[i],nums[mid]] =  [nums[mid],nums[i]]
            mid++
        }
    }

    return nums
};