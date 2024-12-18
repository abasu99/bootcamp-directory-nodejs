const UserSchema = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

//check if jwt token is present in each route
exports.protect=async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token=req.cookies.token;
    // }
    if(!token){
        return next(new ErrorResponse('Unauthorized',401));
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log('---Decoded---',decoded);
        req.user=UserSchema.findById(decoded.id);
        next();
    } catch (error) {
        
    }
}