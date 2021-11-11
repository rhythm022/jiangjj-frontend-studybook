function quickSort(nums,l,r){
  if(l>=r)
    return
  const base = nums[r]
  let le = l
  for(let i = l;i<r;i++){
    if(nums[i]<base){
      [nums[le],nums[i]] = [nums[i],nums[le]]
      le++
    }
  }
  [nums[le],nums[r]] = [nums[r],nums[le]]


  quickSort(nums,l,le-1)
  quickSort(nums,le+1,r)

}
const xxx = [10,5,4,7,6,3,2]
quickSort(xxx, 0, xxx.length - 1)
console.log(xxx)


// 第三版
/*
function quickSort(nums,low,high){
    if(low>=high)
        return
    let le = low
    let ri = high
    let base = nums[low]

    // 这个过程中双指针靠拢
    while(le !== ri){
        while(le !== ri && nums[ri]>=base)ri--//在这步找到可以填le坑的锅
        if(le !== ri )nums[le++] = nums[ri]//把le坑填上但留出了ri的坑，此后，看看le是没有锅可以填re的坑

        while(le !== ri && nums[le]<=base)le++//le在这步找到锅了
        if(le !== ri )nums[ri--] = nums[le]//把ri坑上

    }
    nums[le] = base
    quickSort(nums,low,le-1)
    quickSort(nums,le+1,high)

}


const xxx = [10,5,4,7,6,3,2]
quickSort(xxx, 0, xxx.length - 1)
console.log(xxx)
*/
