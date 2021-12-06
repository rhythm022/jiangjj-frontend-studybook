/**
 * @param {string[]} ops
 * @return {number}
 */
 var calPoints = function(ops) {

    let nums = []

    for(let i = 0;i<ops.length;i++){
        const cur = ops[i]

        if(cur === '+'){
            nums.push(nums[nums.length-1] + nums[nums.length-2])
        }else if(cur === 'D'){
            nums.push(nums[nums.length-1] *2)
        }else if(cur === 'C'){
            nums.pop()
        }else{
            nums.push(Number(cur))
        }
    }


    return nums.reduce((sum,cur)=>sum+=cur,0)

};