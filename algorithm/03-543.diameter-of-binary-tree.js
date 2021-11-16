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
var diameterOfBinaryTree = function (root) {
    if (!root) return 0
    let res = 0
    function DFS(node) {
        let le = node.left ? DFS(node.left) + 1 : 0
        let ri = node.right ? DFS(node.right) + 1 : 0

        let path = le + ri
        res = Math.max(res, path)

        return Math.max(le, ri)
    }
    DFS(root)
    return res
};

