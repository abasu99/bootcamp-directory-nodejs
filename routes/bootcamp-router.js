const express=require('express');
const router = express.Router();
const {getAllBootcamps,getBootcamp,createBootcamp} = require('../controllers/bootcamp-controller')

// Route through controller
router.route('/').get(getAllBootcamps).post(createBootcamp);

router.route('/:name').get(getBootcamp);

module.exports=router;