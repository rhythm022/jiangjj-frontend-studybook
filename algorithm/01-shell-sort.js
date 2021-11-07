function readline(){
    return '2,3,2,1,6,5,4'
  }
  
// 更高效的减少逆序对，插入排序的升级版
// 以 length 为 12 为例，隔gap组成一队：
// gap = 4时：
// 0...4...8...12（迭代4遍）
// 0.2.4.5（迭代2遍）
// 012345
// gap = 6时：
// 0.....6.....12（迭代6遍）两两一队
// 0..3..6..9（迭代3遍）
// 012345

const input = readline().split(',').map(Number)

let  gap = Math.floor(input.length / 2)
while(gap){
    insertionSort(input,gap)
    gap = Math.floor(gap / 2)
}

console.log(input)






// 基于02-insertion-sort.js修改
function insertionSort(input,n){
    for(let i = n;i<input.length;i += n){
        let cur = input[i]
        let j = i - n
    
        while(j>=0 && input[j]>cur){
            input[j+n] = input[j]
            j -=n
        }
        input[j+n] = cur
    
    }
}

// insertionSort(input,1)
