var Twitter = function() {
    this.cur_time = 1
this.users = {
 
}
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    if(!this.users[userId]){
        this.users[userId] = {
            followers : new Set(),
            tweets : [],
    }
  
}
  this.users[userId].tweets.push({
        tweetId,
        time:this.cur_time++
    })

};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    if(!this.users[userId])return []
    const feeds = [...this.users[userId].tweets]
    this.users[userId].followers.forEach(followerId=>{
        if(this.users[followerId]){
             feeds.push(...this.users[followerId].tweets)

        }

    })

    return feeds.sort((b,a)=>a.time - b.time).slice(0,10).map(a=>a.tweetId)
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if(!this.users[followerId]){
        this.users[followerId] = {
            followers : new Set(),
            tweets : [],
    }
  
}
  this.users[followerId].followers.add(followeeId)
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    this.users[followerId].followers.delete(followeeId)
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */