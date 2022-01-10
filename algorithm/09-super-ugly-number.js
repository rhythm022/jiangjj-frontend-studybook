/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
 var nthSuperUglyNumber = function(n, primes) {
    const r = new Array(primes.length).fill(1)

    let dp = []
    dp[1] = 1
    for(let i = 2;i<=n;i++){
        let min = Number.MAX_SAFE_INTEGER
        primes.forEach((prime,index)=>{
            const cur = prime * dp[r[index]]
            if(cur<min){
                min = cur
            }

           
        })
        dp[i] = min
         primes.forEach((prime,index)=>{
            const cur = prime * dp[r[index]]
            if(cur === min){
                r[index]++
            }

           
        })
    }
    return dp[n]
};