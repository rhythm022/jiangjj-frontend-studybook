/**
 * @param {number} n
 * @return {number}
 */
 var nthUglyNumber = function(n) {
    let r2 = 1
    let r3 = 1
    let r5 = 1
    let dp = []
    dp[1] = 1
    for(let i = 2;i<=n;i++){
        dp[i] = Math.min(Math.min(dp[r2]*2,dp[r3]*3),dp[r5]*5)
        if(dp[i] === dp[r2]*2) r2++
        if(dp[i] === dp[r3]*3) r3++
        if(dp[i] === dp[r5]*5) r5++
    }
    return dp[n]
};