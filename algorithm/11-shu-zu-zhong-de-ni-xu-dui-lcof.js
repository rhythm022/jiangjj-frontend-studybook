/**
 * @param {number[]} nums
 * @return {number}
 */
 var reversePairs = function(nums) {
    let res = 0
    function merge(arr,start,end){
    if(start>=end)return 
    const mid = (start + end)>>1
    merge(arr,start,mid)
    merge(arr,mid+1,end)

    let i = start
    let j = mid + 1
    let new_arr = []
    while(i<=mid || j <=end){
        const cur_i = arr[i]
        const cur_j = arr[j]
        if(
            (i<=mid && j <=end && cur_i <= cur_j ) ||
            j> end
        ){
            new_arr.push(cur_i)
            i++
        }else{
            res+= mid - i + 1
            new_arr.push(cur_j)
            j++
        }
    }

    for(let i = 0 ;i<new_arr.length;i++){
        arr[start+i] = new_arr[i]
    }
}

merge(nums,0,nums.length -1)
return res
};


