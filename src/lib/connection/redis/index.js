const redis = require("redis");

const Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const config= require("config");

const client = redis.createClient(config.get("db.redis"));

client.on("error", function (err) {
    console.log("Error " + err);
});


module.exports={

    getRedisSessionEntryForUser:function(userId){
        return client.hgetallAsync(userId).then(function(res) {
            if(res){
                return Promise.resolve(res)
            }else{
                return Promise.resolve(false)
            }
        });
    },
    setUserSessionForUser:function(userId, accessTime, mongoDocId){
        const hmsetParams= mongoDocId?
            [userId, "clientAccessTime", accessTime, "localAccessTime", (new Date()).toISOString(), "mongoDocId", mongoDocId]:
            [userId, "clientAccessTime", accessTime, "localAccessTime", (new Date()).toISOString()]

        return client.hmsetAsync(hmsetParams)
            .then(function(res) {
                if(res){
                    return Promise.resolve(true)
                }else{
                    return Promise.resolve(false)
                }
            });
    },
    deleteUserSessionFromRedis:function(userId){
        return client.delAsync(userId).then(function(res) {
            if(res){
                return Promise.resolve(true)
            }else{
                return Promise.resolve(false)
            }
        });
    },
    getAllKeys:function(){
        return client.keysAsync("*")
            .then(function(res) {
                if(res){
                    return Promise.resolve(res)
                }else{
                    return Promise.resolve(false)
                }
            });
    }

}