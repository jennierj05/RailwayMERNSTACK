const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  
  fromStation: {
    type: String,
    required: [true, "fromStation is require"],
  },
  toStation: {
    type: String,
    required: [true, "toStation is require"],
  },
  departureDate: {
    type: Date,
    required: [true, "departureDate is require"],
  },
  Class: {
    type: String,
    required: [true, "seatNumber is require"],
  },
  General: {
    type: String,
    required: [true, "ticketPrice is require"],
  },
  pnrNumber: {
    type: Number,
    required: [true, "pnrNumber is require"],
  },
  totalAmount: {
    type: Number,
    required: [true, "totalAmount is require"],
  },
  Count: {
    type: Number,
    required: [true, "totalAmount is require"],
  },
  seatNumber: {
    type: Number,
    required: [true, "totalAmount is require"],
  },
  Berth: {
    type: String,
    required: [true, "totalAmount is require"],
  }


});
 
const ticketModel = mongoose.model("Tickets", ticketSchema);

module.exports = ticketModel;