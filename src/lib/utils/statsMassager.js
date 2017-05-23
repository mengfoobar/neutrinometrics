"use strict";
const DateUtils = require('./dateUtils')
const Immutable = require('immutable')


module.exports={

    normalizeAggStats:function(start, end, aggStatsArr){
        let aggStatsMap=mapArrToObj(aggStatsArr)
        let arr=DateUtils.getZeroValDateArray(start, end);

        for(var i=0 ;i<arr.length; i++){
            if(aggStatsMap[arr[i].date]){
                arr[i].value=aggStatsMap[arr[i].date]
            }
        }
        return arr;

    },
    normalizeCustomEventsData:function(start, end, eventsList, eventsData){
        let eventDataMap=mapCustomEventsDataToObj(eventsData)
        let arr=DateUtils.getZeroValDateArray(start, end);

        let emptyEventsData={}
        for(let i=0; i<eventsList.length; i++){
            emptyEventsData[eventsList[i]]=0;
        }

        for(let i=0 ;i<arr.length; i++){
            if(eventDataMap[arr[i].date]){
                arr[i]=eventDataMap[arr[i].date]
            }else{
                emptyEventsData.date=arr[i].date
                let newDataEntry = Immutable.fromJS(emptyEventsData);
                arr[i]= newDataEntry.toJS()
            }
        }
        return arr;

    }
}

function mapArrToObj(arr){
    let obj ={}
    for(let i=0; i<arr.length; i++){
        obj[arr[i].date]=arr[i].value
    }
    return obj;
}

function mapCustomEventsDataToObj(arr){
    let obj ={}
    for(let i=0; i<arr.length; i++){
        obj[arr[i].date]=arr[i]
    }
    return obj;
}


