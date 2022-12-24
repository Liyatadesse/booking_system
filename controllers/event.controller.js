const Event = require('../models/event');
const User = require('../models/user');
const Booking = require('../models/book');

exports.createEvent= async (req, res, next) => {

    const { name,dateOfEvent, price, address,desc ,imageUrl } = req.body;
   // const {image}=req.files.imageBanner.data;
  
    const newEvent = new Event({
     name,
     dateOfEvent,
     price,
     address,
     desc,
     imageUrl

    });
    try{
       const result= await newEvent.save();
        res.status(200).json( result );
    }
    catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchEvents = async (req, res, next) => {

        try {
          const events = await Event.find();
          res.status(200).json({ events: events });
        } catch (err) {
          res.status(400).json(err);
        }
}

