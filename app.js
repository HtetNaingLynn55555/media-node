require('dotenv').config()

let mongoose = require('mongoose');
let express = require('express')
let userRouter = require('./routers/user');
let categoryRouter = require('./routers/category');
let postRouter = require('./routers/posts');

let app = express();


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`)

app.use(express.json());

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/posts', postRouter);

app.use((error, request, response, next)=>{

    error.status = error.status || 200;
    response.status(error.status).json({
        condition : false,
        message : error.message
    })

});

app.use('*', (request, response, next)=>{
    response.status(404).json({
        message : "Under Maintainance"
    })
})

app.listen(process.env.PORT, console.log(`App is listen at ${process.env.PORT} ` ))