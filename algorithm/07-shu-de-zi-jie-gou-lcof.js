/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
 var isSubStructure = function(A, B) {
    if(!A) return B === A
    if(!B) return false
return DFS(A,B)
};
function DFS(a,b){
    if(isSame(a,b))return true
    if(a.left && DFS(a.left,b))return true
    if(a.right && DFS(a.right,b))return true

    return false
}
function isSame(a,b){
    if(!a) return false
    if(b.val !== a.val) return false

    if(b.left && !isSame(a.left,b.left))return false
    if(b.right && !isSame(a.right,b.right))return false

    return true
}