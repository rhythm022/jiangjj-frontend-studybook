 function readline(){
     return '[2,3,8,7,1,2,2,8,9]'
 }


 const inp = JSON.parse(readline())

 const bucket = []
 const res = []
 inp.forEach(val=>{
     if(!bucket[val]){
         bucket[val] = 1
     } else{
         bucket[val]++
     }
 })
 bucket.forEach((cnt,val)=>{
     while(cnt--){
         res.push(val)
     }
 })
 console.log(res.join(','))
