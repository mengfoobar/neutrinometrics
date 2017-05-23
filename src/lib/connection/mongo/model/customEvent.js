const mongoose = require('../entityConnection');
const Schema = mongoose.Schema;


// create a schema
const EventSchema = new Schema({
    "userId": {type:String},
    "customId":{type: String},
    "appId" : {type:String, required: true},
    "event" : {type:String, required: true},
    "date" : {type:String},
    "timestamp" : {type: Date}
});

const Event = mongoose.model('customevents', EventSchema);

module.exports = Event;

