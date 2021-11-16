
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const bucket = {}

    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i]

        if (bucket[cur] === undefined) bucket[cur] = 1
        else bucket[cur]++
    }

    return Object.entries(bucket).sort((a, b) => b[1] - a[1]).slice(0, k).map(it => it[0])
};