/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantDirectedConnection = function(edges) {
    const n = edges.length
    const uf = new UnionFind(n+1)
    const parent = new Array(n+1).fill().map((_,i)=>i)
    let conflict_index = -1
    let cycle_index = -1

    for(let i = 0 ;i<n;i++){
        const [x,y] = edges[i]
        if(parent[y] === y){
            parent[y] = x

            if(uf.find(x) === uf.find(y)){
                cycle_index = i
            }else{
                uf.union(x,y)
            }
        }else{// 分两种情况：1/发现冲突前，已经发现了环。2/发现冲突前，没有发现环
            conflict_index = i


        }

     
    }


    if(conflict_index !== -1 && cycle_index !== -1){
        const [_,y] = edges[conflict_index]
        return [ // 1
            parent[y],y
        ]
    }else if(conflict_index !== -1){
        return edges[conflict_index] // 2

    }else if(cycle_index !== -1){
        return edges[cycle_index]

    }

};


class UnionFind {
  constructor(n) {
    this.count = 0;
    this.parent = new Map()
    for(let i = 0;i<n;i++){
        this.find(i)
    }
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