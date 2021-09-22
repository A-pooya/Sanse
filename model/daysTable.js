const mongoose = require('mongoose');

const CapacitySchema = new mongoose.Schema({
    defaultCapacity :{
        type:Number,
        default:5
    },
    exceptionCapacity:{
        type:Number,
        default:0
    },
})

const SanseSchema = new mongoose.Schema({
    ["8 - 10"]:CapacitySchema,
    ["10 - 12"]:CapacitySchema,
    ["12 - 14"]:CapacitySchema,
    ["14 - 16"]:CapacitySchema,
})

const daysSchema = new mongoose.Schema({
    saturday:SanseSchema,
    sunday:SanseSchema,
    monday:SanseSchema,
    tuesday:SanseSchema,
    wednesday:SanseSchema,
    thursday:SanseSchema,
    friday:SanseSchema,
})



const Sanse = mongoose.model("sanse" , daysSchema);



module.exports = Sanse;