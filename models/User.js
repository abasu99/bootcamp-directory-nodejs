const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters']
    },
    slug: String,
    password: {
        type: String,
        required: [true, 'Please add password'],
        minlength: [8, 'password cannot be less than 8 characters'],
        // select: false
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
    },
    role: {
        type: String,
        enum: ['user', 'publisher','admin'],
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Hashing the password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.slug = slugify(this.username, { lower: true });
    next();
});

//sign jwt token
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE })
}

//Matching hashed password and user entered password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('UserSchema', UserSchema);