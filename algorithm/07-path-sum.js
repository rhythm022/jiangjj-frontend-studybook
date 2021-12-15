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
 * @param {number} targetSum
 * @return {boolean}
 */
 var hasPathSum = function(root, targetSum) {
    if(!root)return false

    const res = {}
    res.found = false

    computeSum(targetSum,res,0,root)

    return res.found
};

function computeSum(targetSum,res,sum,node,){
    if(res.found)return
    if(node.left)computeSum(targetSum,res,sum + node.val,node.left)
    if(node.right)computeSum(targetSum,res,sum + node.val,node.right)
    if(!node.left && !node.right && sum + node.val === targetSum)res.found = true

}