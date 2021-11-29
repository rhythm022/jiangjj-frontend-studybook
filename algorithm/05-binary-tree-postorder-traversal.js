/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal = function(root) {
    if(!root) return []
    const res = []
    DFS(root,res)

    return res
};


function DFS(node,res){
    if(node.left)DFS(node.left,res)
    if(node.right)DFS(node.right,res)

    res.push(node.val)
}