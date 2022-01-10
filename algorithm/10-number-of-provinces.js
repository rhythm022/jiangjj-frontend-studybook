/**
 * @param {number[][]} isConnected
 * @return {number}
 */
 var findCircleNum = function(M) {
    let res = 0
    const visited = new Set()
    for(let i = 0;i<M[0].length;i++){
        const cur = i
        if(!visited.has(cur)){
            visited.add(cur)

            res++
            solve(cur,M)
         
        }
    }
    function solve(cur,M){
        for(let j = 0;j<M[cur].length;j++){
            if(M[cur][j]){
                if(!visited.has(j)){
                    visited.add(j)
                    solve(j,M)
                }
            }
        
        }

    }
    return res
};

