
const mongoose = require("mongoose");

const mySchema = new mongoose.Schema(
  {  
  
   name:{
    type:String,
    required:true
   },
    dateOfEvent: {
      type: String,
      required: true,
    },
    price:{
        type:Number,
        required:true
    },
    address: {
      type: Object,
    },
    desc:{
        type:String,
    },
    imageUrl:{
       type:String,
     }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", mySchema);
