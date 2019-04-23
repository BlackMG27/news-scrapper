//set up mongoose
var mongoose = require('mongoose');
//set up the Schema
var Schema = mongoose.Schema;

var SaveSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
})

var Saved = mongoose.model('Saved', SaveSchema);
module.exports = Saved;