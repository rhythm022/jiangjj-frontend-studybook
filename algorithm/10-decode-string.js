/**
 * @param {string} s
 * @return {string}
 */
 var decodeString = function(s) {
    let res = ''
    let cur_num = ''
    for(let i = 0 ;i<s.length;i++){
        let cur = s[i]
        if(!isNaN(cur)){
            cur_num += cur
        }else if(cur === '['){
            let le_cnt = 0
            let end 
            for(let j = i+1 ; j < s.length; j++){
                let cur_j = s[j]

                if(cur_j === ']'){
                    if(le_cnt){
                        le_cnt--
                        continue
                    }else{
                        end = j
                        break
                    }
                }else if(cur_j === '['){
                    le_cnt++
                }
            }
            const sub = decodeString(s.slice(i+1,end))

            let cnt = +cur_num
            while(cnt--){
                res+=sub
            }
       
            i = end
            cur_num = ''
        }else{
            res+=cur
        }
    }

    return res
};