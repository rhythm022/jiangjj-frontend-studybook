/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var kthGrammar = function(n, k) {
    return f(n,k)
    };
    
    function f(n,k){
        if(n === 1) return 0
        const pre = f(n-1,Math.floor((k+1)/2))
    
         return k % 2 ? pre : pre ^ 1
    }