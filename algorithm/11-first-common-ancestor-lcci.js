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

    function DFS(node){
        if(res) return
        if(!node)return false

        const le_found = DFS(node.left)
        const ri_found = DFS(node.right)
        const self_found = node === p || node === q

        if(le_found && ri_found && !res){
            res = node
            return 
        }
        if(!res){
            if(
                le_found && self_found ||
                ri_found && self_found 
            ){
                res = node
                return 
            }
        }
        return le_found || ri_found || self_found
    }

    DFS(root)

    return res
};


