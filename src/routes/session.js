"use strict";

const express = require('express');
const router = express.Router();
const MongoDBManager = require('../lib/connection/mongo')


router.get("/", function(req, res) {

    if(req.session.user){
        MongoDBManager.getUserInfoUsingId(req.session.user)
            .then(function(results){
                if(!results || results.length===0){
                    res.status(204).json({success:false, message:"user not in system"})
                }else{
                    const userInfo = results[0].userInfo
                    res.status(200).json(userInfo);
                }
            })
    }else{
        res.status(204).json({success:false, message:"user not logged in"})
    }
});

router.post('/', function(req, res) {
    let userLoginInfo=req.body;
    MongoDBManager.getUserInfoUsingLogin(userLoginInfo.email, userLoginInfo.password)
        .then(function(results){
            if(!results || results.length===0){
                throw new Error("Unable to find user info.")
            }
            const userId = results[0].id;
            const userInfo = results[0].userInfo;

            req.session.user=userId;

            res.status(200).json(userInfo);

        })
        .catch(function(err){
            res.status(204).json({error: err.message});
        })

});

router.delete('/', function (req, res) {
    if(req.session){
        req.session.destroy();
        res.status(200).json({success:true})
    }else{
        res.status(400).json({success:false})
    }
});

module.exports = router;