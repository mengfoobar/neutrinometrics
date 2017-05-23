"use strict"

const moment = require('moment')

module.exports={
    GET_DISTINCT_EVENTS: (appId)=>{

        return [
            {
                "$match": {appId : appId}
            },
            {
                "$group": {
                    "_id": "$event",
                    "event": {"$first": "$event"},
                    "firstRecordedOn": {"$first": "$timestamp"}
                }},
            { "$sort": { "firstRecordedOn": 1 } },
            {
                "$project": {
                    _id:0,
                    "label":"$event",
                    "value":"$event"
                }
            }
        ]
    },
   DAILY_AGGREGATION_CUSTOM_EVENTS: (appId, events, startDate, endDate)=>{
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

       let groupPipeline={
           "_id": "$date",
       }

       let prjPipeline={
           "_id": 0,
           "date": "$_id"
       }

        for(let i=0; i<events.length; i++){
            groupPipeline[events[i]]={
                "$sum": {"$cond": [ { "$eq": [ "$event", events[i] ] }, 1, 0 ]}
            }

            prjPipeline[events[i]]=`$${events[i]}`
        }

        return [
            {
                "$match": {
                    "appId": appId,
                    "timestamp": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            },
            { $group:groupPipeline },
            { $sort: { "_id": 1 } },
            { $project: prjPipeline }
        ]

    }


}