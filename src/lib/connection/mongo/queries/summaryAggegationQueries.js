"use strict"
const moment = require('moment')


module.exports={
    NEW_OLD_USERS: (appId, startDate, endDate)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC
        //TODO: fix this one, also include end date
        return [
            {
                "$match": {
                    "appId": appId
                }
            }, {
                $group: {
                    _id: "$appId",
                    "usersPrior": {
                        "$addToSet": {
                            "$cond": [{
                                "$lte": ["$session.firstAccessDateTime",  new Date(`${startAccessDateString}T00:00:00.0Z`)]
                            },
                                "$userId", false
                            ]
                        }
                    },
                    "allUsers": {
                        "$addToSet": {
                            "$cond": [{
                                "lte": ["$session.firstAccessDateTime",   new Date(`${endAccessDateString}T23:59:59.0Z`)]
                            },
                                "$userId",
                                false
                            ]
                        }
                    }
                }
            },
            {
                $project:{
                    _id: 0,
                    items: [
                        {
                            "name":{ $literal: "Existing Users" } ,
                            "value": {$size:{
                                $setDifference: ["$usersPrior", [false]]
                            }}
                        },
                        {
                            "name":{ $literal: "New Users" } ,
                            "value": {$size:{$setDifference: ["$allUsers", "$usersPrior"]}}
                        }

                    ]
                }},
            {$unwind:{path:"$items"}},
            {
                $project : {
                    "_id" : 0,
                    "name" : "$items.name",
                    "value" : "$items.value"
                }
            },
            { "$sort": { "name": 1 } }

        ]
    },
    VERSION: (appId, startDate, endDate)=> {
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC
        return [
            {
                "$match": {
                    "appId": appId,
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            }, {
                $group: {
                    _id: "$appMeta.version",
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: "$_id",
                    value: "$value",
                    _id: 0
                }
            },
            { "$sort": { "name": 1 } }
        ]
    },
    OS: (appId, startDate, endDate)=> {
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC
        return [
            {
                "$match": {
                    "appId": appId,
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            }, {
                $group: {
                    _id: "$os",
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: "$_id",
                    value: "$value",
                    _id: 0
                }
            },
            { "$sort": { "name": 1 } }
        ]
    },
    COUNTRY:(appId, startDate, endDate)=> {
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return  [
            {
                "$match": {
                    "appId": appId,
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    },
                    "location.country": {
                        $ne: ""
                    },
                }
            }, {
            $group: {
                _id: "$location.country",
                value: { $sum: 1 }
            }
        },
            {
                $project: {
                    name: "$_id",
                    value: "$value",
                    _id: 0
                }
            },
            { "$sort": { "value": -1 } }
        ]
    },
    LANGUAGE:(appId, startDate, endDate)=> {
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return  [
            {
                "$match": {
                    "appId": appId,
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    },
                    "language.name": {
                        $ne: ""
                    }

                }
            }, {
                $group: {
                    _id: "$language.name",
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: "$_id",
                    value: "$value",
                    _id: 0
                }
            },
            { "$sort": { "value": -1 } }
        ]
    },
    RETAINED_BOUNCED_USERS:(appId, startDate, endDate)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString =moment(endDate).subtract(1, 'days').format('YYYY-MM-DD')  //bounce rate will not account for today's results becuase is indeterministic
        //TODO: account for only one day selected
        return  [
            {
                $match: {
                    appId: appId
                }
            },
            {
                $project: {
                    _id: 0,
                    sessionDuration:
                        { $divide:
                            [
                                {
                                    $subtract: ["$session.lastAccessDateTime", "$session.firstAccessDateTime" ]
                                },
                                60000
                            ]
                        },
                    userId:"$userId",
                    firstAccessDateTime:"$session.firstAccessDateTime",
                    lastAccessDateTime:"$session.lastAccessDateTime"

                }
            },
            {
                $group: {
                    _id: "$userId",
                    "sessions":{ $sum: 1 },
                    "firstAccessDateTime":{ $first: "$firstAccessDateTime" },
                    "lastAccessDateTime":{ $first: "$lastAccessDateTime" },
                    "sessionDuration":{ $first: "$sessionDuration" }
                }
            },
            {
                $match: {
                    firstAccessDateTime: {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    "retainedUsers": {
                        "$addToSet": {
                            "$cond": [
                                {
                                    "$gt": ["$sessions",  1]
                                },
                                "$_id", false
                            ]
                        }
                    },
                    "oneTimeUsers": {
                        "$addToSet": {
                            "$cond": [
                                {
                                    "$lte": ["$sessions", 1]
                                },
                                "$_id", false
                            ]
                        }
                    }
                }
            },
            {
                $project:{
                    _id: 0,
                    items: [
                        {
                            "name":{ $literal: "Retained Users" } ,
                            "value": {$size:{
                                $setDifference: ["$retainedUsers", [false]]
                            }}
                        },
                        {
                            "name":{ $literal: "Bounced Users" } ,
                            "value": {
                                $size:
                                    {$setDifference: ["$oneTimeUsers", [false]]}
                            }
                        }

                    ]
                }},
            {
                $unwind:{
                    path:"$items"
                }
            },
            {
                $project : {
                    "_id" : 0,
                    "name" : "$items.name",
                    "value" : "$items.value"
                }
            },
            { $sort: { "name": 1 } }
        ]
    }

}