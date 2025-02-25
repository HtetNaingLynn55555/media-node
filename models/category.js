let mongoose = require('mongoose')
let {Schema} = mongoose;

let categorySchema = new Schema({
    name : {type : String, required : true, unique: true},
    created_at : {type : Date , default : Date.now}
})

let Category = mongoose.model('category', categorySchema);

module.exports = Category;