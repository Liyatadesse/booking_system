const express = require("express");
const router = express.Router();

const eventControllers = require('../controllers/event.controller')

router.post("/",  eventControllers.createEvent);

router.get("/", eventControllers.fetchEvents);


module.exports = router;

