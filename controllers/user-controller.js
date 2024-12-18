const UserSchema = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


// Register
exports.register = async (req, res, next) => {
    try {
        console.log('User payload->', req.body);
        const user = await UserSchema.create(req.body);
        sendTokenResponse(user,res);
    } catch (error) {
        console.log('**Error**', error.MongoServerError)
        next(new ErrorResponse(error, 400));
    }
}

// Login
exports.login = async (req, res, next) => {
    try {
        console.log('User payload login->', req.body);
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Please provide an email and password', 400));

        const user = await UserSchema.findOne({ email });
        console.log('User response', user);
        if (!user) return next(new ErrorResponse('Invalid credentials', 401));

        const isMatch = user.matchPassword(password);
        if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

        sendTokenResponse(user,res);
    } catch (error) {
        console.log('**Error**', error)
        next(new ErrorResponse(error, 400));
    }
}

// sending token in cookie
const sendTokenResponse = (user, res) => {
    const token = user.getSignedJwtToken();

    const cookieExpirationDate = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_IN_DAYS * 24 * 60 * 60 * 1000);

    const cookieOptions = {
        expires: cookieExpirationDate,
        httpOnly: true
    }

    res.cookie('token', token, cookieOptions)
        .json({ status: 'success', code: res.statusCode, token });
}