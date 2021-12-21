/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
 var topKFrequent = function (nums, k) {
    const map = new Map();

    for (const num of nums) {//统计频次
        map.set(num, (map.get(num) || 0) + 1);
    }

    //创建小顶堆
    const priorityQueue = new Heap((a, b) => {
        return a[1] === b[1] ? b[0].localeCompare(a[0]) : a[1] - b[1]
    });

    //entry 是一个长度为2的数组，0位置存储key，1位置存储value
    for (const entry of map.entries()) {
        priorityQueue.offer(entry);//加入堆
        if (priorityQueue.size() > k) {//堆的size超过k时，出堆
            priorityQueue.poll();
        }
    }

    const ret = [];

    for (let i = priorityQueue.size() - 1; i >= 0; i--) {//取出前k大的数
        ret[i] = priorityQueue.poll()[0];
    }

    return ret;
};


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */

class Heap {
    constructor(comparator = (a, b) => a - b, data = []) {
        this.data = data;
        this.comparator = comparator;//比较器
        this.heapify();//堆化
    }

    heapify() {
        if (this.size() < 2) return;
        for (let i = Math.floor(this.size()/2)-1; i >= 0; i--) {
            this.bubbleDown(i);//bubbleDown操作
        }
    }

    peek() {
        if (this.size() === 0) return null;
        return this.data[0];//查看堆顶
    }

    offer(value) {
        this.data.push(value);//加入数组
        this.bubbleUp(this.size() - 1);//调整加入的元素在小顶堆中的位置
    }

    poll() {
        if (this.size() === 0) {
            return null;
        }
        const result = this.data[0];
        const last = this.data.pop();
        if (this.size() !== 0) {
            this.data[0] = last;//交换第一个元素和最后一个元素
            this.bubbleDown(0);//bubbleDown操作
        }
        return result;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = (index - 1) >> 1;//父节点的位置
            //如果当前元素比父节点的元素小，就交换当前节点和父节点的位置
            if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
                this.swap(index, parentIndex);//交换自己和父节点的位置
                index = parentIndex;//不断向上取父节点进行比较
            } else {
                break;//如果当前元素比父节点的元素大，不需要处理
            }
        }
    }

    bubbleDown(index) {
        const lastIndex = this.size() - 1;//最后一个节点的位置
        while (true) {
            const leftIndex = index * 2 + 1;//左节点的位置
            const rightIndex = index * 2 + 2;//右节点的位置
            let findIndex = index;//bubbleDown节点的位置
            //找出左右节点中value小的节点
            if (
                leftIndex <= lastIndex &&
                this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
            ) {
                findIndex = leftIndex;
            }
            if (
                rightIndex <= lastIndex &&
                this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
            ) {
                findIndex = rightIndex;
            }
            if (index !== findIndex) {
                this.swap(index, findIndex);//交换当前元素和左右节点中value小的
                index = findIndex;
            } else {
                break;
            }
        }
    }

    swap(index1, index2) {//交换堆中两个元素的位置
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
    }

    size() {
        return this.data.length;
    }
}
