/**
 * @param {number[][]} orders
 * @return {number}
 */
 var getNumberOfBacklogOrders = function(orders) {
    const bank = {
        0:new Heap({comparator : (a, b) => b.value - a.value}),
        1:new Heap({comparator : (a, b) => a.value - b.value}),
    }

    for(let i = 0;i<orders.length;i++){
        const [value,cnt,type] = orders[i]
        const cur = {value,cnt,type}

        const myself = bank[type]
        const oppo = bank[type^1]

        const isOffsetting = {
            0: ()=> oppo.peek().value<=cur.value,
            1: ()=> oppo.peek().value>=cur.value
        }

        while(cur.cnt && oppo.peek() && isOffsetting[type]()){
            const oppo_order = oppo.peek()
            if(cur.cnt >= oppo_order.cnt){
                oppo.poll()
                cur.cnt -= oppo_order.cnt
            }else{
                oppo_order.cnt -= cur.cnt
                cur.cnt = 0
            }
        }

        if(cur.cnt){
            myself.offer(cur)
        }

        
    }
    let res = 0
    while(bank[0].size()){
        const cur = bank[0].poll()
        res += cur.cnt
    }
    while(bank[1].size()){
        const cur = bank[1].poll()
        res += cur.cnt
    }

    return res % 1000000007
};


 class Heap {
    constructor({data = [],comparator = (a, b) => a - b}) {
        this.data = [...data]
        this.comparator = comparator
        this.heapify()

        // console.log(this.data)
    }

    heapify() {
        if (this.size() <= 1) return
        // n -1 
        for (let i = 1; i < this.size(); i++) {
            this.bubbleUp(i)
        }
    }
    bubbleUp(index) {
        const {comparator,data} = this
        while (index > 0) {
            const parentIndex = (index - 1) >> 1
            if (comparator(data[index], data[parentIndex]) < 0) {
                this.swap(index,parentIndex)
                index = parentIndex
             }else{
                 break
             }
        }
    }

    swap(in1,in2){
        [this.data[in1], this.data[in2]] = [this.data[in2], this.data[in1]];
    }
    size(){
        return this.data.length
    }

    offer(val){
        this.data.push(val)
        this.bubbleUp(this.size() - 1)
    }
    peek(){
        if(this.size() === 0) return null

        return this.data[0]
    }

    poll(){
        if(this.size() === 0)return null
        const res = this.data[0]
        const last = this.data.pop()
        if(this.size() !== 0){
            this.data[0] = last
            this.bubbleDown(0)
        }

        return res
    }
    bubbleDown(index){
        const {comparator,data} = this

        const lastIndex = this.size() - 1
        while(true){
            let i = index
            const le = index * 2 + 1
            const ri = index * 2 + 2
            if(le<=lastIndex){
                if(comparator(data[le],data[i])<0){//le/ri中小的那个和较大的父亲换
                    i = le
                }
            }
            if(ri<=lastIndex){
                if(comparator(data[ri],data[i])<0){
                    i = ri
                }
            }
            if(i !== index){
                this.swap(i,index)
                index = i//i是le或ri
            }else{
                break
            }
        }
    }
}