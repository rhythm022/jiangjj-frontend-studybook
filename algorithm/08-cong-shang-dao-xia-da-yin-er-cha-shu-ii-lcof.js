/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    if(!root)return []
    let cur_layer = [root]
    const res = []
    while(cur_layer.length){
        const next_layer = []
        const layer_res = []
        cur_layer.forEach(cur_node=>{
            layer_res.push(cur_node.val)
            if(cur_node.left)next_layer.push(cur_node.left)
            if(cur_node.right)next_layer.push(cur_node.right)
        })
        res.push(layer_res)
        cur_layer = next_layer
    }
    return res
    };