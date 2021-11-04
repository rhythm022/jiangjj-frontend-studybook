const bucketArr = [3,2,1,4,7,6]
console.log('before bucket sorting ===>', bucketArr)
console.log('after bucket sorting ===>', bucketSort(bucketArr))


function bucketSort(arr, range = 5) {
    if (!arr.length) return arr
  
    let min = arr[0]
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i] 
      if (arr[i] > max) max = arr[i] 
    }
  
    
    //桶的初始化
    let buckets = new Array(Math.floor((max - min) / range) + 1).fill().map(()=>new Array())

    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i]
        const bucketIndex = Math.floor((cur - min) / range) // 利用映射函数将数据分配到各个桶中
        buckets[bucketIndex].push(cur)
    }
  
    for (let i = 0; i < buckets.length; i++) {
        const cur = buckets[i]

        insertionSort(cur) 

    }
  
    return buckets.flat()
  }




function insertionSort(input,n = 1){
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
