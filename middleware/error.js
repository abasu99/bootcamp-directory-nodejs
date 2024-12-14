const errorHandler =(err,req,res,next)=>{
    console.log('-----Error Handler-----',err.name);

    res.status(err.statusCode||500).json({
        status:'failure',
        code: err.statusCode,
        message:`${err.message}`||'Server error'
    });
}

module.exports=errorHandler;