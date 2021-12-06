/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var backspaceCompare = function(s, t) {


    let s_i = s.length - 1
    let t_i = t.length - 1
    let s_sign = 0
    let t_sign = 0
    while(s_i >=0 || t_i>=0){
        const cur_s = s[s_i]
        const cur_t = t[t_i]
    
        if(cur_s === '#'){
            s_sign++
            s_i--
            continue
        }
        if(cur_t === '#'){
            t_sign++
            t_i--
    
            continue
    
        }
    
        if(s_sign){
            s_sign--
            s_i--
            continue
        }
    
        if(t_sign){
            t_sign--
            t_i--
            continue
    
        }
        if(cur_t === cur_s){
            t_i--
            s_i--
    
        }else{
            return false
        }
    }
    
    return true
    };