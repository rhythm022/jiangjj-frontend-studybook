/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
 var generateTrees = function(n) {
    if(n === 0)return []

    return solve(1,n)

};


function solve(start,end){
    if(start>end)return [null]
    const res = []
    for(let i = start;i<=end;i++){
        const le_arr = solve(start,i-1)
        const ri_arr = solve(i+1,end)
        for(let j = 0;j<le_arr.length;j++){
            for(let k = 0;k<ri_arr.length;k++){
               const cur = new TreeNode(i)
                cur.left = le_arr[j]
                cur.right = ri_arr[k]
                res.push(cur)
            }
        }
    }
    return res

}