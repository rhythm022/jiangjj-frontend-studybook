/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isValidBST = function(root) {
    if(!root) return true
    let res = true
    let pre = null
    function DFS(node){
        if(!res)return 

    if(node.left) DFS(node.left)
    if(pre && pre.val >= node.val){
        res = false
    }
    pre = node
    if(node.right) DFS(node.right)
    }


    DFS(root)
    return res
};
