function mergeSort(nums, l, r) {
  if (l === r) return
  const mid = (l + r) >> 1
  mergeSort(nums, l, mid)
  mergeSort(nums, mid + 1, r)

  const tmp = []
  let i = l
  let j = mid + 1
  while (i <= mid || j <= r) {
    if (i <= mid && j <= r) {
      if (nums[j] < nums[i]) {
        tmp.push(nums[j])
        j++
      } else {
        tmp.push(nums[i])
        i++
      }

    } else {
      if (j <= r) {
        tmp.push(nums[j])
        j++
      } else {
        tmp.push(nums[i])
        i++
      }
    }
  }


  tmp.forEach((val, index) => {
    nums[l + index] = val
  })
}
function sort(nums) {
  mergeSort(nums, 0, nums.length - 1)

  return nums
}

const xxx = sort([5, 10, 9, 4, 3, 7, 6])


console.log(xxx)
