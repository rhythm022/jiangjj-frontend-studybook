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
 * @return {number}
 */
 var countNodes = function(root) {
    if(!root) return 0

    const res = {}
    res.count = 0
    count(res,root)
    return res.count
};
function count(res,node){
    res.count++
    if(node.left)count(res,node.left)
    if(node.right)count(res,node.right)
}