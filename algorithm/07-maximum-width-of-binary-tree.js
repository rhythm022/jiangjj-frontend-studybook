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
 var widthOfBinaryTree = function(root) {
    if(!root)return 0
    root.pos = 1
    let cur_layer = [root]
    let res = 0

    while(cur_layer.length){
        const next_layer = []
       
        cur_layer.forEach(cur=>{
             
             res = Math.max(res,cur.pos - cur_layer[0].pos)
            const cur_pos = cur_layer.length === 1 ? 1 :cur.pos
            if(cur.left){
                cur.left.pos = 2 * cur_pos - 1

                next_layer.push(cur.left)
            }

             if(cur.right){
                cur.right.pos = 2 * cur_pos

                next_layer.push(cur.right)

            }
        })


    cur_layer = next_layer



    }


return res + 1



};


