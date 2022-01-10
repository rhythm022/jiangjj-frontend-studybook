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
 var isSymmetric = function(root) {
    let cur_level = [root]
    let res = true
    function isSym(nodes){
        for(let i=0,j=nodes.length -1;i<j;i++,j--){
            const le = nodes[i]
            const ri = nodes[j]
            if(!le && !ri) continue
            if(!le || !ri) return false
            if(le.val !== ri.val)return false
        }

        return true
    }
    while(cur_level.length){
        if(!isSym(cur_level)){
            res = false
            break
        }

        const next_level = []
        for(let i = 0;i<cur_level.length;i++){
            const cur_node = cur_level[i]
            if(!cur_node) continue

            next_level.push(cur_node.left)
            next_level.push(cur_node.right)
        }
        cur_level = next_level
    }


    return res
};




