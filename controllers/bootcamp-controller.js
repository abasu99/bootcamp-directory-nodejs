const BootcampSchema = require('../models/Bootcamp');

// Remote data
const cars=[
    {carId:'56283',carName:'Nano'},
    {carId:'44123',carName:'Safari'}
];

// Get all bootcamps
exports.getAllBootcamps=async (req,res,next)=>{
    // res.json({status:'success',result:cars});
    try {
        const bootcamps=await BootcampSchema.find();
        res.json({status:'success',count:`${bootcamps.length}`,data:bootcamps});
    } catch (error) {
        res.status(400).json({status:'failure',message:`${error}`});
    }
}

// Get bootcamp by name
exports.getBootcamp=async (req,res,next)=>{
    // const carObj=cars.find(car=>car.carId===req.params.id);
    // const msg=carObj?`Details of Car ID - ${req.params.id}`:`Car ID - ${req.params.id} not found`;
    // res.json({status:'success',message:msg,result:carObj});

    try {
        const bootcamp=await BootcampSchema.find({name:req.params.id});
        console.log(`find by name-> ${bootcamp}`);
        res.json({status:'success',data:bootcamp});
    } catch (error) {
        res.status(400).json({status:'failure',message:`${error}`});
    }
}

// Create bootcamp
exports.createBootcamp=async (req,res,next)=>{
    console.log(`Body-> ${JSON.stringify(req.body)}`);
    try {
        const bootcamp=await BootcampSchema.create(req.body);
        res.json({status:'success',message:`Bootcamp created with name - ${bootcamp.name}`,data:bootcamp});
    } catch (error) {
        res.status(400).json({status:'failure',message:`${error}`});
    }
}