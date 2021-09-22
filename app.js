const mongoDB = require('./config/database');
const {handleErrors} = require('./middleware/errorHandler');


const express = require('express');
const dotEnv = require('dotenv');

//*dotEnv
dotEnv.config({path:"./config/configure.env"})

const app = express();

//*express parser
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//*require routes
const routes = require('./routes/SanseRoute');


//* database connectoin
mongoDB();

//*Routes
app.use(routes)

//*ErrorHandler
app.use(handleErrors);


   
const port = 4000
app.listen(port , () => {console.log(`server is running on port ${port}`);})