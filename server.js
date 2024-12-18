const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const morgan = require('morgan');
const bootcampRouter=require('./routes/bootcamp-router');
const userRouter=require('./routes/user-router');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

// Configuring .env file
dotenv.config({path:'./config/config.env'});

const app=express();

// Connecting MongoDB
connectDB();

// Middleware
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Route files
app.use('/api/v1/bootcamps',bootcampRouter);
app.use('/api/v1/auth',userRouter);

app.use(errorHandler);
const PORT=4999;


const server=app.listen(PORT,console.log(`Server running on PORT -> ${PORT}`));

process.on('unhandledRejection',(error,promise)=>{
    // console.log(`Error message: ${error.message}`);
    server.close(()=>process.exit(1));
});