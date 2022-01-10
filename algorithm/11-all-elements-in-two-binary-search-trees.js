/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
 var getAllElements = function(root1, root2) {
    const res1 = []
    const res2 = []
    DFS(root1,res1)
    DFS(root2,res2)

    let i = 0
    let j = 0
    const res3 = []
    while(i<res1.length || j<res2.length){
        const cur_i = res1[i]
        const cur_j = res2[j]
        if(
            (i<res1.length && j<res2.length && cur_i < cur_j) ||
            j>=res2.length
        ){
            res3.push(cur_i)
            i++
        }else{
            res3.push(cur_j)
            j++

        }
    }
    return res3
};

function DFS(node,res){
    if(!node)return
    if(node.left)DFS(node.left,res)
    res.push(node.val)
    if(node.right)DFS(node.right,res)
}