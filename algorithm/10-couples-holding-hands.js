/**
 * @param {number[]} row
 * @return {number}
 */
 var minSwapsCouples = function(row) {
    const uf = new UnionFind()
    for(let i = 0;i<row.length;i=i+2){
        const left = row[i]
        const right = row[i + 1]
        uf.union(left>> 1,right>> 1)




    }
    return  row.length / 2 - uf.count 
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