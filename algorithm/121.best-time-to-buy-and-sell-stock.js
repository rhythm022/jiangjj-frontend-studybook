/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    let min = prices[0]
    let res = 0
    for(let i=1;i<prices.length;i++){
        const cur = prices[i]
        if(cur<min){
            min=cur
        }else{
            res = Math.max(res,cur-min)
        }

    }
    return res
};