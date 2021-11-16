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
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if (!root) return root

    DFS(root)

    return root
};

function DFS(node) {
    let tmp = node.left
    node.left = node.right
    node.right = tmp

    if (node.left) DFS(node.left)
    if (node.right) DFS(node.right)

}