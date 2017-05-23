"use strict";

const express = require('express');
const router = express.Router();
const MongoDBManager = require('../lib/connection/mongo');
const RedisManager = require('../lib/connection/redis');
const logger = require('../lib/utils/logger')
const moment = require('moment')


router.use('/', function (req, res, next) {
    req.body.ip=req.get('x-real-ip');
    next();
});



router.post('/', function(req, res) {

    //TODO: check if actually works
    let appStat=req.body;

    const appId = req.body.appId;
    const userId = req.body.userId || "";

    if(!appId || !userId){
        res.status(204).json({success:false});
        return;
    }

    logger.info(`STAT req received for APPID: ${req.body.appId}, USER_ID: ${req.body.userId}`);

    RedisManager.getRedisSessionEntryForUser(userId)
        .then(function(result){
            if(!result || !appStat){
                return MongoDBManager.insertStat(appStat)
            }else{
                return Promise.resolve(true)
            }
        })
        .then(function(result){
                if(result){
                    return RedisManager.setUserSessionForUser(userId, appStat.accessTime, result._id ? result._id.toString():null)
                }else{
                    return Promise.resolve(false)
                }})
        .then(function(result){
            if(result){
                logger.info(`STAT success for APPID: ${req.body.appId}, USER_ID: ${req.body.userId}`);
                res.status(200).json({success:true});
            }else{
                throw new Error(result)
            }})
        .catch(function(err){
            logger.error(`ERROR process STAT for : ${appId}, USER_ID: ${userId}.`);
            logger.error(`${err}`);
            res.status(400).json({success:false});
        })
});


router.post('/event', function(req, res) {

    let eventStat=req.body;

    const appId = req.body.appId;
    const userId=req.body.userId;

    if(!appId || !userId){
        res.status(204).json({success:false});
        return;
    }

    logger.info(`EVENT req received for APPID: ${req.body.appId}, USER_ID: ${req.body.userId}`);

    MongoDBManager.insertCustomEvent(eventStat)
        .then(function(result){
            if(result){
                logger.info(`EVENT req success APPID: ${req.body.appId}, USER_ID: ${req.body.userId}`);
                res.status(200).json({success:true});
            }else{
                throw new Error(result)
            }
        })
        .catch(function(err){
            logger.error(`ERROR EVENT for APPID: ${req.body.appId}, USER_ID: ${req.body.userId}.`);
            logger.error(`${err}`);
            res.status(400).json({success:false});
        })
});

router.put('/project/user', function(req, res) {

    const appId = req.body.appId;
    const userId=req.body.userId;
    const customId = req.body.customId;

    MongoDBManager.updateUserCustomId(appId, userId, customId)
        .then(function(results){
            if(results){
                res.status(200).json({success:true});
            }else{
                throw new Error(`Unable to update custom id for user ${userId}`)
            }
        })
        .catch(function(err){
            logger.error(`ERROR EVENT for APPID: ${req.body.appId}, USER_ID: ${req.body.userId} when updating customId`);
            logger.error(`${err}`);

            res.status(400).json({success:false});
        })

})

module.exports = router;