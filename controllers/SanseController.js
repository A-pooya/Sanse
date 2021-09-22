const Sanse = require('../model/daysTable')
const Ticket = require('../model/reservedSanse')

exports.getAllSanse = async (allReservedSanse , req , res , next , ) => {
    try {
    const findSanse = await Sanse.find().countDocuments();

    if(findSanse === 0) { 
    const allSanse = await Sanse.create({
        saturday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:0 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:0},
        },
        sunday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:0 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:0},
        },
        monday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:0 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:0},
        },
        tuesday:{
            ["8 - 10"]:{dafaultCapacity:5, exceptionCapacity:0},
            ["10 - 12"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{dafaultCapacity:5,exceptionCapacity:0},
        },
        wednesday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:0 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:0},
        },
        thursday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:0 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:0},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:0},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:0},
        },
        friday:{
            ["8 - 10"]:{ dafaultCapacity:5, exceptionCapacity:2 },
            ["10 - 12"]:{ dafaultCapacity:5,exceptionCapacity:2},
            ["12 - 14"]:{dafaultCapacity:5,exceptionCapacity:2},
            ["14 - 16"]:{ dafaultCapacity:5,exceptionCapacity:2}
        },
    })
        res.status(200).json({allSanse,allReservedSanse})
    }else{
  
  //* determine capacity of each sanse

    const findReservedSanse = await Ticket.find({})
    const lastTicket = findReservedSanse[findReservedSanse.length - 1]

    const day = lastTicket.day;
    const sanse = lastTicket.sanse;
    
    const getAllSanse = await Sanse.find({})
    const ObjectId = getAllSanse[0]._id

    const getSanse = await Sanse.findOne({_id : ObjectId})
     
    const number = getSanse[day][sanse].defaultCapacity 
     getSanse[day][sanse].defaultCapacity = number - 1;
    
     if(number !== 1){
         await getSanse.save()
         res.status(200).json({getSanse,allReservedSanse})
      }else{
        const error = new Error("your choosen sanse is full")
        error.statusCode = 400;
        next(error);
      }
    }


  } catch (err) {
      console.log(err);
      const error = new Error("sever have problem please wait")
      error.statusCode = 400;
      next(error);
  }
}

//* reserving Ticket

exports.getReservedSanse = async (req , res , next) => {
    try {
        const reserving = (day , sanse, sanseDate) => {
             if(day === "friday"){

            return Ticket.create({
                day,
                sanse,
                sanseDate,
                reserve:true,
            }) 
        }else{
            return Ticket.create({
                day,
                sanse,
                sanseDate,
                reserve:true,
        })
    }
}
    const isThereAnySanse = await Sanse.find({}).countDocuments();
    
    if(isThereAnySanse > 0){
        await reserving("saturday" , "12 - 14" , "27/9/2021")
        const allReservedSanse = await Ticket.find({})
        next(allReservedSanse)
    }else{
        const allReservedSanse = "there isn't any reserve"
        next(allReservedSanse)
    }
          
} catch (err) {
        console.log(err);
        const error = new Error("your reservation was unsuccessful")
        error.statusCode = 400;
        next(error);
    }
}