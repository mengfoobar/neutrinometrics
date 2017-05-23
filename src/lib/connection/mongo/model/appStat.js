var mongoose = require('../entityConnection');
var Schema = mongoose.Schema;


// create a schema
const AppStatSchema = new Schema({
    appId: { type: String, required: true},
    accessDate: {type: String, required: true},
    userId:{type: String},
    customId:{type: String},
    location:{
        city: String,
        province: String,
        country: String,
        continent: String,
        latitude: Number,
        longitude: Number,
        postalCode: String
    },
    language:{
        code: String,
        name: String
    },
    os:{type: String},
    appMeta:{
        version: String,
        name: String
    },
    session:{
        firstAccessDateTime: Date,
        lastAccessDateTime: Date
    }
});

//var userSchema=

// the schema is useless so far
// we need to create a model using it
const AppStat = mongoose.model('appstats', AppStatSchema);
//AppStatSchema.set('collection', 'rawStats');

// make this available to our users in our Node applications
module.exports = AppStat;

