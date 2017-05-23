"use strict";

const DEVELOPMENT_MODE = global.DEV_MODE;


const express = require('express');
const router = express.Router();
const MongoDBManager = require('../lib/connection/mongo')
const moment = require('moment')


router.use('/', function (req, res, next) {
    if(req.method==="POST" || DEVELOPMENT_MODE){
        next();
        return;
    }

    let appId=req.query.appid;
    let userId = req.session.user
    if(!userId){
        res.status(400).json({error: "Forbidden: user not logged in"});
        return;
    }
    else if(!appId){
        res.status(400).json({error: "No app specified"});
        return;
    }
    MongoDBManager.verifyIfAppExistForUser(userId, appId)
        .then(function(result){
            if(!result){
                res.status(404).json({error: "App "+ appId+" was not found."});
            }else{
                next()
            }
        })
        .catch(function(err){
            res.status(500).json({error: err});
        })

})

/* GET users listing. */
router.get("/", function(req, res) {
    const appId = req.query.appid;

    const startDate= req.query.startDate;
    const endDate= req.query.endDate;
    const metric= req.query.metric;

    MongoDBManager.getAggregation(appId, startDate, endDate, metric)
        .then(function(results){
            if(results){
                res.status(200).json({
                    success:true,
                    "metric":"session",
                    "data": results
                });
            }else{
                res.status(200).json({success:false});
            }
        })
        .catch(function(err){
            res.status(200).json({success:false, error: err});
        })
});

router.get("/:appid/events", function(req, res) {

    MongoDBManager.getDistinctEvents(req.params.appid)
        .then(function(results){
            if(results){
                res.status(200).json({
                    success:true,
                    data: results
                });
            }else{
                res.status(200).json({
                    success:true,
                    data:[]
                })
            }
        })
        .catch(function(err){
            res.status(204).json({
                success:false,
                error: err.message
            })
        })

});

router.get("/events/data", function(req, res) {

    if(!req.query.events){
        res.status(200).json({
            success:true,
            data: []
        });
    }
    else{

        MongoDBManager.getCustomEvents(req.query.appid, req.query.events.split(","), req.query.startDate, req.query.endDate)
            .then(function(results){
                if(results){
                    res.status(200).json({
                        success:true,
                        data: results
                    });
                }else{
                    res.status(200).json({
                        success:true,
                        data:[]
                    })
                }
            })
            .catch(function(err){
                res.status(204).json({
                    success:false,
                    error: err.message
                })
            })
    }
});


router.get("/users/data", function(req, res) {

    const limit=parseInt(req.query.limit) > 0 ?  parseInt(req.query.limit):100;

    MongoDBManager.getAppUsersStats(req.query.appid, req.query.startDate, req.query.endDate, limit)
        .then(function(results){
            if(results){
                res.status(200).json({
                    success:true,
                    data: results
                });
            }else{
                res.status(200).json({
                    success:true,
                    data:[]
                })
            }
        })
        .catch(function(err){
            res.status(204).json({
                success:false,
                error: err.message
            })
        })
});



router.get("/events/users", function(req, res) {

    const limit=parseInt(req.query.limit) > 0 ?  parseInt(req.query.limit):100;

    MongoDBManager.getAppUserEvents(req.query.appid,req.query.events.split(","), req.query.startDate, req.query.endDate, limit)
        .then(function(results){
            if(results){
                res.status(200).json({
                    success:true,
                    data: results
                });
            }else{
                res.status(200).json({
                    success:true,
                    data:[]
                })
            }
        })
        .catch(function(err){
            res.status(204).json({
                success:false,
                error: err.message
            })
        })
});


router.put("/", function(req, res) {

    const projectInfo={
        userId:req.session.user,
        id: req.body.id,
        name:req.body.name,
        website:req.body.website
    };

    MongoDBManager.updateProject(projectInfo)
        .then(function(results){
            if(results){
                res.status(200).json({
                    success:true
                })
            }else{
                throw new Error("unable to update project info")
            }
        })
        .catch(function(err){
            res.status(204).json({
                success:false,
                msg: err.message
            })
        })

});

module.exports = router;