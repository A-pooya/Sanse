const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    day:{
        type: String ,
        required:true,
    },
    sanse:{
        type:String,
        required:true,
    },
    reserve:{
        type:Boolean,
        required:true,
        default:false,
    },
    sanseDate:{
        type:String,
        required:true
    }, 
});



const Ticket = mongoose.model('Ticket' , ticketSchema);

module.exports = Ticket;