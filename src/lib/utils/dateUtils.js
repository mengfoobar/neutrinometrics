const moment = require('moment')

module.exports={
    getZeroValDateArray:function(start, end){
        let arr=[];
        const startDate = moment(start).toDate()
        const endDate = moment(end).toDate()

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            arr.push({
                date: moment(d).format("YYYY-MM-DD"),
                value:0
            })
        }
        return arr;

    }
}