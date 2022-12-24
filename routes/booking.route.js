const express = require("express");
const router = express.Router();

const bookControllers = require('../controllers/booking.controller')

router.post("/",  bookControllers.bookEvent);

router.get("/", bookControllers.fetchUserBookings);


module.exports = router;


// localhos:5000/event/
// localhost:5000/event?userId=<UserID>&phoneNUmer=<phoneNUmber>