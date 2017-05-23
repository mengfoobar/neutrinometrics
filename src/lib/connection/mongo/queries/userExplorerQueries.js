const moment = require('moment')

module.exports={
    GET_USER_STATS: function(appId, startDate, endDate, limit=100){
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC

        return [
            {
                $match: {
                    "appId": appId,
                    "session.firstAccessDateTime": {
                        $gte: new Date(`${startAccessDateString}T00:00:00.0Z`),
                        $lte: new Date(`${endAccessDateString}T23:59:59.0Z`)
                    }
                }
            },
            {
                $project: {
                    "userId":{ $substr: [ "$userId", 24, 36 ] },
                    "customId":"$customId",
                    "version":"$appMeta.version",
                    "language":"$language.code",
                    "country":"$location.country",
                    "os":"$os",
                    "sessionTime":{
                        $divide:[{$subtract:[ "$session.lastAccessDateTime" , "$session.firstAccessDateTime" ]}, 60000]
                    }
                }},
            {
                $group:{
                    _id: "$userId",
                    "customId":{ $last: "$customId" },
                    "sessions":{ $sum: 1 },
                    "avgSession":{ $avg: "$sessionTime"},
                    "version":{ $last: "$version" },
                    "language": { $last: "$language" },
                    "os":{ $last: "$os" },
                    "country":{$last:"$country"}
                }
            },
            {
                $addFields:{avgSession:{$divide:[{$subtract:[{$multiply:['$avgSession',100]}, {$mod:[{$multiply:['$avgSession',100]}, 1]}]}, 100]}}
            },
            {
                $sort: { "sessions": -1 }
            },
            {$limit: limit}
        ]
    },
    GET_USER_EVENTS: function(appId, events, startDate, endDate, limit=100){
        const startAccessDateString = moment(startDate).format('YYYY-MM-DD'); //in order to account for UTC
        const endAccessDateString = moment(endDate).format('YYYY-MM-DD'); //in order to account for UTC


        let groupPipeline={
            "_id": "$userId",
            "customId":{ $last: "$customId" },
            "totalEvents":{"$sum": 1}
        }

        for(let i=0; i<events.length; i++){
            groupPipeline[events[i]]={
                "$sum": {"$cond": [ { "$eq": [ "$event", events[i] ] }, 1, 0 ]}
            }
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
            { $group:groupPipeline},
            {
                $addFields:{ "userId":{ $substr: [ "$_id", 24, 36 ] }}
            },
            { $sort: { "totalEvents": -1 }},
            { $limit: limit}

        ]
    }

}