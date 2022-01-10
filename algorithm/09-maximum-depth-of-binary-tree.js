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
 var maxDepth = function(root) {
    let res =0 
    function DFS(node,level){
        if(!node){
            res = Math.max(res,level)
            return
        }
        DFS(node.left,level+1)
        DFS(node.right,level+1)
    
    }
    DFS(root,1)
    
    return res - 1
    };
    
    