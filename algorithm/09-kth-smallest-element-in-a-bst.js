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
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k) {
    let res
    let cnt = 0 
    function DFS(node){
        if(res)return 
        if(node.left)DFS(node.left)


        cnt++
        if(cnt === k){
            res = node.val
        }
        if(node.right)DFS(node.right)
    }
    DFS(root)
    return res
};

