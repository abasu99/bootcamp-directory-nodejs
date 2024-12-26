const BootcampSchema = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const UserSchema = require('../models/User');
const jwt = require('jsonwebtoken');

// Get all bootcamps
exports.getAllBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await BootcampSchema.find();
        res.json({ status: 'success', code: res.statusCode, count: `${bootcamps.length}`, data: bootcamps });
    } catch (error) {
        // res.status(400).json({status:'failure',message:`${error}`});
        next(new ErrorResponse(error, 400));
    }
}

// Get bootcamp by name
exports.getBootcamp = async (req, res, next) => {
    // console.log('----res----',res)
    try {
        const bootcamp = await BootcampSchema.find({ slug: req.params.name });
        console.log(`find by name-> ${(req.headers.authorization)}`);
        if (bootcamp.length) {
            res.json({ status: 'success', code: res.statusCode, data: bootcamp });
        } else {
            next(new ErrorResponse(`No bootcamp found with name - ${req.params.name}`, 404));
        }
    } catch (error) {
        // res.status(400).json({status:'failure',message:`${error}`});
        next(new ErrorResponse(`No bootcamp found with name - ${req.params.name}`, 404));
    }
}

// Create bootcamp
exports.createBootcamp = async (req, res, next) => {
    console.log(`** ** **Headers-> ${req.headers}`);
    
    try {
        const token= req.headers.authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const currentUser=UserSchema.findById(decoded.id);
        // req.body.createdBy = currentUser.id;
        const activeBootcampExists = await BootcampSchema.findById(decoded.id);
        console.log('active----',activeBootcampExists);
        
        if (activeBootcampExists && currentUser.role === 'publisher') {
            return next(new ErrorResponse('Only 1 active bootcamp allowed per publisher', 400));
        }
        const bootcamp = await BootcampSchema.create(req.body);
        res.json({ status: 'success', code: res.statusCode, message: `Bootcamp created with name - ${bootcamp.name}`, data: bootcamp });
    } catch (error) {
        // res.status(400).json({status:'failure',message:`${error}`});
        // console.log('create bootcamp error',JSON.parse(error));
        next(new ErrorResponse(error, 400));
    }
}