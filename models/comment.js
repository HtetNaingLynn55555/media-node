let mongoose = require("mongoose");
let {Schema} = mongoose;

let commentSchmea = new Schema({
    post_id : {type : Schema.Types.ObjectId, required: true},
    name : {type : String, required : true},
    email : {type :String, required:true},
    content : {type : String, required: true},
})

let Comment = mongoose.model('comment', commentSchmea);

module.exports = Comment;