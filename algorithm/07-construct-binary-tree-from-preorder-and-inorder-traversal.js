/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
    return DFS(preorder, inorder)
    };
    
    function DFS(preorder, inorder){
        if(!inorder.length)return null
        const cur = preorder.shift()
        const cur_node = new TreeNode(cur)
        const in_index = inorder.indexOf(cur)
    
        cur_node.left = DFS(preorder,inorder.slice(0,in_index))
        cur_node.right = DFS(preorder,inorder.slice(in_index+1))
    
        return cur_node
    }