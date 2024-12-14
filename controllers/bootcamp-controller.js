const BootcampSchema = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');


// Get all bootcamps
exports.getAllBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await BootcampSchema.find();
        res.json({ status: 'success',code:res.statusCode, count: `${bootcamps.length}`, data: bootcamps });
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
        console.log(`find by name-> ${bootcamp}`);
        if (bootcamp.length) {
            res.json({ status: 'success', code:res.statusCode, data: bootcamp });
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
    // console.log(`Body-> ${JSON.stringify(req.body)}`);
    try {
        const bootcamp = await BootcampSchema.create(req.body);
        res.json({ status: 'success',code:res.statusCode, message: `Bootcamp created with name - ${bootcamp.name}`, data: bootcamp });
    } catch (error) {
        // res.status(400).json({status:'failure',message:`${error}`});
        // console.log('create bootcamp error',JSON.parse(error));
        next(new ErrorResponse(error, 400));
    }
}