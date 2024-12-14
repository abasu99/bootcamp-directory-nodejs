const UserSchema = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


// Register
exports.register = async (req, res, next) => {
    try {
        console.log('User payload->',req.body);
        const user = await UserSchema.create(req.body);
        const token=user.getSignedJwtToken();
        res.json({ status: 'success',code:res.statusCode,token});
    } catch (error) {
        next(new ErrorResponse(error, 400));
    }
}

// Login
exports.login = async (req, res, next) => {
    try {
        console.log('User payload login->',req.body);
        const {email,password}=req.body;
        if(!email || !password) return next(new ErrorResponse('Please provide an email and password',400));
        
        const user = await UserSchema.findOne({email});
        console.log('User response',user);
        if(!user) return next(new ErrorResponse('Invalid credentials',401));

        const isMatch = user.matchPassword(password);
        if(!isMatch) return next(new ErrorResponse('Invalid credentials',401));

        const token=user.getSignedJwtToken();
        res.json({ status: 'success',code:res.statusCode,token});
    } catch (error) {
        next(new ErrorResponse(error, 400));
    }
}