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
 const MUST_NEED_CAMERA = 1
 const MUST_NOT_NEED_CAMERA = 2
 const CAMERA = 3
var minCameraCover = function(root) {
    let cnt = 0
    function DFS(node){
        if(!node)return MUST_NOT_NEED_CAMERA

        const leftRes = DFS(node.left)
        const rightRes = DFS(node.right)

        if(leftRes === MUST_NEED_CAMERA || rightRes === MUST_NEED_CAMERA){
            cnt++
            return CAMERA
        }

        if(leftRes === CAMERA || rightRes === CAMERA){
            return MUST_NOT_NEED_CAMERA 
        }

        return MUST_NEED_CAMERA
    }

    const rootRes = DFS(root)

    if(rootRes === MUST_NEED_CAMERA)cnt++
    
    return cnt
};