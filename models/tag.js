let mongoose = require('mongoose')
let { Schema } = mongoose;

let tagSchema  = new Schema({
    name : {type : String, required : true, unique : true},
    created_at : {type: Date, default : Date.now}
})

let Tag = mongoose.model('tag', tagSchema)

module.exports = Tag