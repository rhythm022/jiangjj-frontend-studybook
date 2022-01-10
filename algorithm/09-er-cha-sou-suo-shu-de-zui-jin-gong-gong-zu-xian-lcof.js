/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    let res 

const isPQ = node => node === p || node === q
    function DFS(node){
        if(!node) return false

        const left = DFS(node.left)
        const right = DFS(node.right)
        const cur = isPQ(node)
        if(!res){
            if(
                (left && right) ||
                (left && cur) ||
                (cur && right) 
            ){
                res = node
                return 
            }

        }
         return left || right || cur
    
    }

    DFS(root)

    return res
};