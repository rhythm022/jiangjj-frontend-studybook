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
 * @return {number[][]}
 */
 var levelOrderBottom = function(root) {
    if(!root)return []
    let cur_layer = [root]
    const stack = []
    while(cur_layer.length){
        const next_layer = []
        const layer_res = []
        cur_layer.forEach(cur_node=>{
            layer_res.push(cur_node.val)
            if(cur_node.left)next_layer.push(cur_node.left)
            if(cur_node.right)next_layer.push(cur_node.right)
        })
        stack.push(layer_res)
        cur_layer = next_layer
    }

    const res = []
    while(stack.length){
        res.push(stack.pop())
    }


    return res
};