/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    if(!grid.length) return 0   
    const x_size = grid[0].length
    const y_size = grid.length

    let res = 0

    function solve(i,j,grid){
        if(grid[i][j] === '1'){
            grid[i][j] = '0'
            if(i+1<y_size)solve(i+1,j,grid)
            if(i-1>=0)solve(i-1,j,grid)
            if(j+1<x_size)solve(i,j+1,grid)
            if(j-1>=0)solve(i,j-1,grid)
        }
    }

    for(let i = 0;i<y_size;i++){
        for(let j = 0;j<x_size;j++){
            if(grid[i][j] === '1'){
                res++
                solve(i,j,grid)
            }
        }

    }

    return res

};