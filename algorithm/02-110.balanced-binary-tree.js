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
var isBalanced = function (root) {
    if (!root) return true
    let res = true
    function DFS(node) {
        let le = node.left ? DFS(node.left) : 0
        let ri = node.right ? DFS(node.right) : 0

        if (Math.abs(le - ri) >= 2) {
            res = false
        }
        return Math.max(le, ri) + 1

    }
    DFS(root)

    return res
};

