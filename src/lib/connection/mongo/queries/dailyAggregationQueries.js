"use strict"

const moment = require('moment')

module.exports={
    DAILY_SESSIONS: (appId, startDate, endDate, limit=30)=>{

        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return [
            { "$match": {
                "session.firstAccessDateTime": {
                    $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                    $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                },
                appId : appId
            }
            },
            {
                "$project": {
                    "formattedDate": {
                        "$dateToString": {
                            "format": "%Y-%m-%d", "date": "$session.firstAccessDateTime"
                        }
                    },
                }
            },
            { "$group": {
                "_id": "$formattedDate",
                "date": {"$first": "$formattedDate"},
                "value": { "$sum": 1 }
            }},
            { "$sort": { "_id": 1 } }
        ]
    },
    SESSIONS_DURATION: (appId, startDate, endDate, limit=30)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return [
            {
                "$match": {
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    },
                    "appId": appId
                }
            },
            { $project: {
                item: 1,
                accessDate:"$accessDate",
                sessionTime:{
                    val:{
                        $subtract:[ "$session.lastAccessDateTime" , "$session.firstAccessDateTime" ]
                    }
                }
            }},
            {
                $group:
                    {
                        _id: "$accessDate",
                        "date": { $first: "$accessDate" },
                        avgSession: { $avg: "$sessionTime.val" }
                    }
            },
            { $project: {
                item: 1,
                date:"$date",
                value:{
                    $divide: [ "$avgSession", 60000  ] }
            }},
            { "$sort": { "_id": 1 } }
        ]
    },
    NEW_USERS: (appId, startDate, endDate, limit=30)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return [
            {
                "$match": {
                    "appId": appId
                }
            },
            {
                $group: {
                    _id:"$userId",
                    firstAccessDateTime: {$min: "$session.firstAccessDateTime"},
                    firstAccessDate: { $min: "$accessDate" }
                }
            },
            {
                "$match": {
                    "firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            },
            {
                $group: {
                    _id: "$firstAccessDate",
                    "firstAccessDate": { "$sum": 1 }
                }
            },
            { $project: {
                item: 1,
                date:"$_id",
                value:"$firstAccessDate"
            }},
            { "$sort": { "_id": 1 } }
        ]

    },
    DAILY_ACTIVE_USERS: (appId, startDate, endDate, limit=30)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC
        return     [{
            "$match": {
                "appId": appId,
                "session.firstAccessDateTime": {
                    $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                    $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                }
            }
        },{
            $group: {
                "_id": "$accessDate",
                "users": { $addToSet: "$userId" }
            }
        },
            { $project: {
                item: 1,
                date:"$_id",
                value:{"$size":"$users"}
            }},
            { "$sort": { "date": 1 } }
        ]
    }



}