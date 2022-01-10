/**
 * @param {number[][]} stones
 * @return {number}
 */
 var removeStones = function(stones) {

    const uf = new UnionFind()
    
    for(let i = 0 ; i< stones.length;i++){
        const [x,y] = stones[i]


        uf.union(x+10000,y)
    }

    return stones.length - uf.count

};








class UnionFind {
  constructor() {
    this.count = 0;
    this.parent = new Map()
  }
  find(x) {
    const {parent} = this

      if(!parent.has(x)){
          parent.set(x,x)
            this.count++
      }

      if(x !== parent.get(x)){
          parent.set(x,this.find(parent.get(x)))
      }


    return parent.get(x);
  }
  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);
    if (rootP === rootQ) return;
    this.parent.set(rootP,rootQ)
    this.count--;
  }
}