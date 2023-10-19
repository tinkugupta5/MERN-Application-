const express = require('express') 
const createHttpErrors = require('http-errors')
const morgan = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(morgan('dev')) // this package is used for which route is hitted by user.


app.get('/',(req,res,next) => {
    res.send('Working')
})

app.use((req,res,next) => {
    next(createHttpErrors.NotFound());
})

app.use((error,req,res,next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.send(error);
})

const PORT = process.env.PORT || 3000 
mongoose.connect(process.env.MONGO_URI,{
    dbName:process.env.DB_NAME,
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify:false

}).then(()=>{
    console.log('💾 Connected...')
    app.listen(PORT,()=>console.log(`🚀 on port ${PORT}`));
}).catch(err =>console.log(err.message))

