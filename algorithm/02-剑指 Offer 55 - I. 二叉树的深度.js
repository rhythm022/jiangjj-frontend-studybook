/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (!root) return 0
    return DFS(root)

};

function DFS(node) {

    let le = node.left ? DFS(node.left) : 0
    let ri = node.right ? DFS(node.right) : 0

    return Math.max(le, ri) + 1

}