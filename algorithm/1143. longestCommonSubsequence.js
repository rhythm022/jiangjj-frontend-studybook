/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
 var longestCommonSubsequence = function(text1, text2) {
    const y_len = text1.length
    const x_len = text2.length
    const dp = new Array(y_len+1).fill().map(()=>new Array(x_len+1).fill(0))
    for(let x = 1;x<=x_len;x++){
         for(let y = 1;y<=y_len;y++){

             if(text2[x-1] === text1[y-1]){
                 dp[y][x] = dp[y-1][x-1] +1
             }else{
                 dp[y][x] = Math.max(dp[y][x-1],dp[y-1][x])
             }
    }

    }
    return dp[y_len][x_len]

};