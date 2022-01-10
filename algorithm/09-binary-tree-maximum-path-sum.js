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
 var maxPathSum = function(root) {
    if(!root) return 0
    let res = -Number.MAX_SAFE_INTEGER
    function DFS(node){
        if(!node) return 0 
        let left = DFS(node.left)
        let right = DFS(node.right)

        left = left < 0 ? 0 : left
        right = right < 0 ? 0 : right

        res = Math.max(res,left+right + node.val)


        return Math.max(Math.max(left,right),0) + node.val
    }
DFS(root)
return res
};


