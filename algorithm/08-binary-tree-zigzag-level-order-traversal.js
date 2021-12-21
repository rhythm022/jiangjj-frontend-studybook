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
 var zigzagLevelOrder = function(root) {
    if(!root)return []
    let cur_layer = [root]
    const res = []
    let level = 1
    while(cur_layer.length){
        level ^= 1
        const next_layer = []
        const layer_res = []
        cur_layer.forEach(cur_node=>{
            layer_res.push(cur_node.val)
            if(cur_node.left)next_layer.push(cur_node.left)
            if(cur_node.right)next_layer.push(cur_node.right)
        })
      
     
        if(level){
            const reversed_layer_res = []
            while(layer_res.length){
                reversed_layer_res.push(layer_res.pop())
            }
            res.push(reversed_layer_res)
        }else{
            res.push(layer_res)
        }
        cur_layer = next_layer
    }
    return res
    };