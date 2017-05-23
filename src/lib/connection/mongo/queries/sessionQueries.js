"use strict";

module.exports={
    LOGIN: (email, password)=>{
        return [
            {
                "$match": {
                    "email": email,
                    "password":password
                }
            },
            {
                "$lookup": {
                    "localField": "id",
                    "from": "apps",
                    "foreignField": "userId",
                    "as": "apps"
                }
            },
            {
                "$project":{
                    _id:0,
                    "id": 1,
                    userInfo:{
                        "email": "$email",
                        "fullName":"$fullName",
                        "dateJoined":"$dateJoined",
                        "apps": "$apps"
                    }
                }
            }
        ]
    },
    GET_USER_INFO: (userId)=>{
        return [
            {
                "$match": {
                    "id": userId
                }
            },
            {
                "$lookup": {
                    "localField": "id",
                    "from": "apps",
                    "foreignField": "userId",
                    "as": "apps"
                }
            },
            {
                "$project":{
                    _id:0,
                    userInfo:{
                        "email": "$email",
                        "fullName":"$fullName",
                        "dateJoined":"$dateJoined",
                        "apps": "$apps"
                    }

                }
            }
        ]
    }
}