var mongoose = require('../entityConnection');
var Schema = mongoose.Schema;


// create a schema
const ProjectSchema = new Schema({
    id: { type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String},
    website: {type:String},
    dateCreated: {type: Date}
});

//var userSchema=

// the schema is useless so far
// we need to create a model using it
const Project = mongoose.model('apps', ProjectSchema);
//AppStatSchema.set('collection', 'rawStats');

// make this available to our users in our Node applications
module.exports = Project;

