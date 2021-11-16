/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const hash = {}
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i]

        if (hash[target - cur] !== undefined) {
            return [hash[target - cur], i]
        }

        hash[cur] = i
    }
};