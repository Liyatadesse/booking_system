const Event = require('../models/event');
const User = require('../models/user');
const Booking = require('../models/book');
const fetch = require("node-fetch");
const { findOne } = require('../models/user');
const axios = require('axios').default;


exports.fetchUserBookings = async (req, res, next) => {
    const userId = req.query.userId;
     
    try{

      //console.log(userId);
          const userBook = await Booking.find({userId:userId}).populate({
            path:'event',
            match:{type:'Event'}
          });
      //    console.log(userBook);
                return    res.status(200).json({userBooked:userBook});
       
    
        }
         catch (err) {
          res.status(400).json({message:err});

        }
}

exports.bookEvent = async (req, res, next) => {
    const { userId, eventId } = req.body;

    try{
      console.log("hey")
    const event = await Event.findById(eventId);

    if(!event) {
      // Throw error;
      res.status(400).json({message: 'EVENT NOT FOUND'});
    }
    
    const user = await User.findById(userId);
    
    if(!user) {
      // Throw error;
      res.status(400).json({message: 'USER NOT FOUND'});
    }
    
    const body = {
    principal:"+251919298457",
    credentials:"test@12345",
    system:"lucy"
    }
    
    // Authenticate
    const authResult = await fetch('https://api-et.hellocash.net/authenticate', {
	    method: 'post',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(body),
    });

    const data = await authResult.json();

    console.log('data - ',data);
    var token;
    
    if(data && data.token){
    
      token=data.token
     // console.log("result from login - ",token)
    }

    const value= await fetch('https://api-et.hellocash.net/invoices',{
      method:'post',
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        amount:event.price,
        from: user.phonenumber,
        description:` for ${event.name}`,
       
        // "+251967299678"
       }),
    })

    const payment=  await value.json();
    
    console.log('Please pay this ',payment);
    
    // Booking 
    const book = new Booking({
    userId: userId,
    event: eventId,
    ticketNumber: 101,
    invoiceId: payment['id'] //Check field name
    });
       
   
    const result= await book.save();
    console.log("result is gonna be ",result)

    res.status(200).json({result: {...result,name:event.name,address:event.address,dateOfEvent:"event.dateOfEvent",price:event.price,desc:"this is desc"}});    
  } catch (err) {
  //  console.log("error here ",err);
    res.status(400).json({message: err});
  }

}
