const express=require('express');
const router = express.Router();
const {getAllBootcamps,getBootcamp,createBootcamp} = require('../controllers/bootcamp-controller');
const {protect}=require('../middleware/auth');

// Route through controller
router.route('/').get(protect,getAllBootcamps).post(protect,createBootcamp);

router.route('/:name').get(protect,getBootcamp);

module.exports=router;