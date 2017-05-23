"use strict";


const AppStat=require("./model/appStat.js");
const User=require("./model/user.js");
const Project=require("./model/project.js");
const Event=require("./model/customEvent.js");


const getLocation = require("./../maxmind/maxMindCache");
const moment = require('moment');
const StatsMassager = require('../../utils/statsMassager')

const DailyAggQueries = require('./queries/dailyAggregationQueries')
const SummaryAggQueries = require('./queries/summaryAggegationQueries')
const SessionQueries = require('./queries/sessionQueries.js')
const EventsQueries = require('./queries/eventsQueries.js');
const UserQueries = require('./queries/userExplorerQueries')

const LanguageCodeToNameMap=require('../../constants/languageCodeToNameMap').getNameForCode
const Logger = require('../../utils/logger')

const Promise = require('bluebird')

module.exports= {
    getAggregation:function(appId, startDate, endDate, metric){
        const queryFunction = DailyAggQueries[metric] || SummaryAggQueries[metric]

        const query = AppStat.aggregate(
            queryFunction(appId, startDate, endDate)
        )

        return new Promise(function(resolve, reject){
            query.exec()
                .then(function(results){
                    if(results){
                        const normalizedArr=
                            DailyAggQueries[metric]?
                                StatsMassager.normalizeAggStats(startDate, endDate, results)
                                :results
                        resolve(normalizedArr)
                    }else{
                        throw new Error()
                    }
                }).catch(function(err){
                reject();
            })
        })

    },
    updateAppStatEntry:function(_id, accessTime){
        //TODO: change this for most recent entry
        const query = AppStat.update(
            {_id:_id},
            {$set: { 'session.lastAccessDateTime':new Date(accessTime)}},
            {
                writeConcern: {
                w: 0,
                wtimeout: 100}}
            );
        return query.exec();
    },
    getStatEntryForLast:function(appId, userId, accessTime, min=0){

        let setSessionDuration = DEV_MODE ? 10000: min*60000

        const query = AppStat.findOne({
            'appId': appId,
            'userId': userId,
            'session.lastAccessDateTime': {$gte: new Date((new Date(accessTime)).getTime() - setSessionDuration)}
        })
        return query.exec();
    },
    insertStat:function(stat){
        //TODO: add error handling for ip without city, region, country ..etc
        let newStatEntry;
        try{
            newStatEntry=new AppStat({
                appId: stat.appId,
                userId: stat.userId || "",
                customId:stat.customId,
                location:getLocation(stat.ip),
                os:stat.os,
                language:{
                    code:stat.language,
                    name:LanguageCodeToNameMap(stat.language)
                },
                appMeta: stat.appMeta,
                accessDate: stat.accessTime.substring(0, 10),
                session:{
                    firstAccessDateTime:new Date(stat.accessTime),
                    lastAccessDateTime:new Date(stat.accessTime)
                }
            });
            return newStatEntry.save();

        }catch(err){
            Logger.error(`ERROR ${err}`);
            return Promise.resolve(err);
        }


    },
    getUserFromEmail:function(email){
        const query = User.findOne({
            "email": email
        })
        return query.exec()
    },
    updateUser:function(userInfo){
        //TODO: add error handling for ip without city, region, country ..etc
        let query;
        try{

            query=User.update(
                { id: userInfo.id },
                {
                    $set:
                        {
                            email: userInfo.email,
                            fullName: userInfo.fullName
                        }
                }
            )
        }catch(err){
            console.log(err)
        }
        return query.exec();
    },
    insertProjectEntry:function(projectInfo){
        let newProjectEntry;
        try{
            newProjectEntry=new Project({
                id: projectInfo.id,
                userId: projectInfo.userId,
                name: projectInfo.name,
                website: projectInfo.website,
                dateCreated: new Date()
            });
        }catch(err){
            console.log(err)
        }

        return newProjectEntry.save();
    },
    updateProject:function(prjInfo){
        //TODO: add error handling for ip without city, region, country ..etc
        let query;
        try{

            query=Project.update(
                {
                    id: prjInfo.id,
                    userId: prjInfo.userId
                },
                {
                    $set:
                        {
                            name: prjInfo.name,
                            website: prjInfo.website
                        }
                }
            )
        }catch(err){
            console.log(err)
        }
        return query.exec();
    },
    verifyIfAppExistForUser:function(userId, appId){
        const query = Project.findOne({
            "userId": userId,
            'id': appId
        })

        return query.exec()
    },
    getDistinctEvents:function(appId){
        const query = Event.aggregate(
            EventsQueries.GET_DISTINCT_EVENTS(appId)
        )
        return query.exec()
    },
    getCustomEvents:function(appId, eventsArr,startDate, endDate){
        const query = Event.aggregate(
            EventsQueries.DAILY_AGGREGATION_CUSTOM_EVENTS(appId, eventsArr,startDate, endDate)
        )

        return query.exec()
            .then(function(results){
                if(results){
                    const normalizedArr= StatsMassager.normalizeCustomEventsData(startDate, endDate, eventsArr, results)
                    return Promise.resolve(normalizedArr)
                }else{
                    throw new Error()
                }
            }).catch(function(err){
                return Promise.reject(err.message);
            })
    },
    insertCustomEvent:function(eventInfo){
        let netCustomEventEntry;
        try{
            netCustomEventEntry=new Event({
                event: eventInfo.event,
                userId: eventInfo.userId,
                customId:eventInfo.customId,
                appId: eventInfo.appId,
                timestamp: new Date(eventInfo.timestamp),
                date: eventInfo.timestamp.substring(0, 10)
            });
        }catch(err){
            console.log(err)
        }

        return netCustomEventEntry.save();
    },
    getAppUsersStats:function(appId, startDate, endDate, limit){
        const query = AppStat.aggregate(
            UserQueries.GET_USER_STATS(appId, startDate, endDate, limit)
        )

        return query.exec();
    },
    getAppUserEvents:function(appId, events, startDate, endDate, limit){
        const query = Event.aggregate(
            UserQueries.GET_USER_EVENTS(appId,events, startDate, endDate, limit)
        )

        return query.exec();
    },
    updateUserCustomId:function(appId, userId, customId){
        //TODO: add error handling for ip without city, region, country ..etc
        let updateQueries=[];

        updateQueries.push(AppStat.update(
            {
                appId:appId,
                userId: userId
            },
            { $set: {customId:customId}},
            { multi: true }
        ));

        updateQueries.push(Event.update(
            {
                appId:appId,
                userId: userId
            },
            { $set: {customId:customId}},
            { multi: true }
        ))

        return Promise.all(updateQueries);
    },
}