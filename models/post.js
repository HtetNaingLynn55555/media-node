let mongoose = require('mongoose')
let {Schema} = mongoose;

let postSchema = new Schema({
    user_id : {type : Schema.Types.ObjectId, ref : 'user', required : true},
    category_id: {type: Schema.Types.ObjectId, ref: 'category', required: true},
    title : {type : String, required : true},
    content : {type : String, required: true},
    image : {type : String},
    created_at : {type :Date, default : Date.now},

})


let Post = mongoose.model('post', postSchema);

module.exports = Post;