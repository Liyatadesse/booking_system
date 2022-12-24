
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
   event:{
    type:mongoose.Types.ObjectId,
    ref: 'Event',
    required:true
   },
   quantity:{
    type:Number,
    required:true,
    default:1
   },
    status: {
        type: String,
        default: "PENDING",
    },
    invoiceId: {
      type: String,
      required: true,
    },
    ticketNumber:{
        type:Number,
        required: true
    },

  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", bookSchema);



  
