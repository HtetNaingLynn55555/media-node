let mongoose = require('mongoose')
let {Schema} = mongoose


let userSchema = new Schema({
    name : { type : String, required : true, unique: true},
    email : {type : String, required : true, unique: true},
    password : {type : String, required: true},
    phone : {type : String, required: true},
    created_at: { type: Date, default: Date.now },
    image : {type : String},
})

let User = mongoose.model('user', userSchema);

module.exports = User;
