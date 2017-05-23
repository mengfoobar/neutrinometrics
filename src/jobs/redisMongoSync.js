const MongoDBManager = require('../lib/connection/mongo')
const RedisDBManager = require('../lib/connection/redis')
const jobConfig = require('config').get("jobs.userSessionSync");

const Moment = require('moment');

let ExpiringSessionInMs = jobConfig.expiringSession;

module.exports={
    exec:function(){
        userSessionSync();
        setInterval(userSessionSync, jobConfig.execInterval)
    }
}

function userSessionSync(){
    const promiseArr =[];
    RedisDBManager.getAllKeys()
        .then(function(result){
            for(let i=0; i<result.length; i++){
                promiseArr.push(updateSession(result[i], ExpiringSessionInMs))
            }

            return Promise.all(promiseArr)
        })
        .then(function(results){
            if(!results){
                throw new Error("user sessions sync failed")
            }
        })
        .catch(function(err){
            console.log(err)
        })
}

function updateSession(id){

    return RedisDBManager.getRedisSessionEntryForUser(id)
        .then(function(result){

            const clientAccessTime= result.clientAccessTime;
            const mongoDocId = result.mongoDocId;
            const userId = id;

            if(!result){
                return Promise.resolve(false)
            }

            if(Moment(result.localAccessTime).add(ExpiringSessionInMs, 'milliseconds').isBefore(Moment()) ){

                MongoDBManager.updateAppStatEntry(mongoDocId, clientAccessTime)
                    .then(function(result){
                        if(result){
                            return RedisDBManager.deleteUserSessionFromRedis(userId)
                        }else{
                            throw new Error("Unable to update MongoDB entry")
                        }
                    })
                    .then(function(result){
                        if(result){
                            return Promise.resolve(true)
                        }else{
                            throw new Error("Unable to delete session from Redis")
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                        return Promise.resolve(false)
                    })
            }
        })

}