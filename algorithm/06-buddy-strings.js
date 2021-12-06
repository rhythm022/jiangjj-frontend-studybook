/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
 var buddyStrings = function(s, goal) {
    if(s.length !== goal.length) return false

    let set = new Set()
    let repeat = false
    let time = 0
    let diff
    for(let i =0;i<s.length;i++){
        const cur_s = s[i]
        const cur_go = goal[i]
        if(set.has(cur_s))repeat = true
        set.add(cur_s)


        if(cur_go !== cur_s){
            if(time === 0){

                time = 1
                diff = [cur_s,cur_go]
            }else if(time === 1){

                time = 2

                if(diff[0] === cur_go && diff[1] === cur_s){

                }else{
                    return false
                }
            }else if( time === 2){

                return false
            }
        }
    }
    return time === 2 || (time === 0 && repeat)
};