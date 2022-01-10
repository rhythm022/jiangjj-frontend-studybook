/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
 var accountsMerge = function(accounts) {
    const sets_mail = []
    const arrs_mail = []
    for(let i =0;i<accounts.length;i++){
        const cur = accounts[i].slice(1)

        sets_mail[i] = new Set(arrs_mail[i] = cur)

    }

    const uf = new UnionFind()

    for(let i =0;i<accounts.length;i++){
        const cur_i = arrs_mail[i]
        for(let j = i+1;j<accounts.length;j++){
            const cur_j = sets_mail[j]

            let intersection = cur_i.filter(x => cur_j.has(x));

            if(intersection.length){
                uf.union(i,j)
            }
        }
    }
    const hash = {}
    for(let i =0;i<accounts.length;i++){
        const root = uf.find(i)
        if(!hash[root]){
            hash[root] = []
        }
                  hash[root].push(i)

        
    }
    const res = []
    for(const key in hash){
        const cur = hash[key]

        const name = accounts[key][0]
        const email = [...new Set(cur.map(i =>arrs_mail[i]).flat())].sort()

        res.push([
            name,...email
        ])
    }

    return res

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
