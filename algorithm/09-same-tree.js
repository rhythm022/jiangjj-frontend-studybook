/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
 var isSameTree = function(p, q) {
    if(!p || !q) return q === p
    function DFS(a,b){
        if(!a && !b)return true
        if(!a || !b)return false
        if(a.val !== b.val) return false

        return DFS(a.left,b.left) && DFS(a.right,b.right)


    }

    
    return DFS(p, q)
};