function readline(){
  return '2,1,3,2,1'
}

const input = readline().split(',').map(Number)


for(let i = 0;i<input.length-1;i++){
  let min = i
  for(let j = i+1;j<input.length;j++){
    if(input[j]<input[min]){
      min = j
    }
  }
  [input[i],input[min]] = [input[min],input[i]]
}

console.log(input)
