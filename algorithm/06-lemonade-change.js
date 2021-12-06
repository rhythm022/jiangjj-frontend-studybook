/**
 * @param {number[]} bills
 * @return {boolean}
 */
 var lemonadeChange = function(bills) {

    let five = 0
    let ten = 0
        for(let i = 0;i<bills.length;i++){
            const cur = bills[i]
            if(cur === 5){
                five++
            }else if(cur === 10){
                if(five ===0)return false
                ten++
                five--
            }else if(cur === 20){
                if(ten && five){
                    ten--
                    five--
                }else if(five >=3){
                    five -= 3
                }else{
                    return false
                }
            }
        }
    
        return true
    };