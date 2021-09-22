const mongoose = require('mongoose');

const mongoDB =  () => {
         mongoose.connect(process.env.MONGOURI)
        .then(() => {
            console.log(`database connected`);
        }).catch((err) => {
            console.log(err);
        })   
}

module.exports = mongoDB;