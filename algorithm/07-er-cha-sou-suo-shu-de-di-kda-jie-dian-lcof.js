/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthLargest = function(root, k) {
    let ctx = {
        count:0
    }
    DFS(ctx,root,k)

    return ctx.res
};

function DFS(ctx,node,k){
    if(ctx.res !== undefined)return

    if(node.right)DFS(ctx,node.right,k)

    ctx.count++
    if(ctx.count === k)ctx.res = node.val

    if(node.left)DFS(ctx,node.left,k)

}