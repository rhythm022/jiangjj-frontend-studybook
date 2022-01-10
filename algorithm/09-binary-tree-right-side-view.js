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
 * @return {number[]}
 */
 var rightSideView = function(root) {
    if(!root)return []
    let cur_level = [root]
    const res = []
    let level = -1
    while(cur_level.length){
        level++
        const next_level = []
        for(let i = 0;i<cur_level.length;i++){
            const cur_node = cur_level[i]
            res[level] = cur_node.val
            if(cur_node.left)next_level.push(cur_node.left)
            if(cur_node.right)next_level.push(cur_node.right)
        }
        cur_level = next_level

    }


    return res
};