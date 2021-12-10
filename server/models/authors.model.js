const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema =  new Schema({
    name: String,
    location: String
});

module.export = mongoose.model('Book', authorSchema);