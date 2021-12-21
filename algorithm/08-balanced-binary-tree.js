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
 * @return {boolean}
 */
 var isBalanced = function(root) {
    let res = true
    function DFS(node){
        if(!res) return
        if(!node) return 0
        const leftRes = DFS(node.left)
        const rightRes = DFS(node.right)
    
        if(Math.abs(leftRes - rightRes)>1){
            res = false
        }
        return Math.max(leftRes,rightRes) + 1
    }
    
    DFS(root)
    return res
    };
    
    
    