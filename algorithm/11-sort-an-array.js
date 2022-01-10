/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArray = function(nums) {
    merge(nums,0,nums.length -1)
    
    return nums 
    };
    
    function merge(arr,start,end){
        if(start>=end)return 
        const mid = start + Math.floor((end - start)/2)
        merge(arr,start,mid)
        merge(arr,mid+1,end)
    
        let i = start
        let j = mid + 1
        let new_arr = []
        if(arr[mid]<arr[mid+1])return 
        while(i<=mid || j <=end){
            const cur_i = arr[i]
            const cur_j = arr[j]
            if(
                (i<=mid && j <=end && cur_i < cur_j ) ||
                j> end
            ){
                new_arr.push(cur_i)
                i++
            }else{
                new_arr.push(cur_j)
                j++
            }
        }
    
        for(let i = 0 ;i<new_arr.length;i++){
            arr[start+i] = new_arr[i]
        }
    }