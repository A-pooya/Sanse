const {Router} = require('express');

const {getAllSanse,getReservedSanse} = require('../controllers/SanseController'); 

const router = new Router();

router.get("/getsanse" ,getReservedSanse,getAllSanse)


module.exports = router;