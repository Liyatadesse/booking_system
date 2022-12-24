
const PORT = process.env.PORT || 5026
const express= require('express');
const jwt = require('jsonwebtoken');
const  app= express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');


// var fileUpload = require('express-fileupload');

const authRoute=require('./routes/auth')
const bookingRoute=require('./routes/booking.route')
const eventRoute= require('./routes/event.route')
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('db connected');
}).catch((err)=>{
    console.log(err);
    
});


// app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.set('view engine ','ejs')
 app.use("/auth", authRoute);
 app.use('/book',bookingRoute);
 app.use('/event',eventRoute);
 app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
 })
