//set up mongoose
var mongoose = require('mongoose');
//set up the schema
var Schema = mongoose.Schema;
//create a noteSchema constructor
var NoteSchema = new Schema({
    title: String,
    body: String,
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
})

//create the note collection 
var Note = mongoose.model('Note', NoteSchema);
//export the note collection schema
module.exports = Note;