const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const morgan = require('morgan');
const bootcampRouter=require('./routes/bootcamp-router');

// Configuring .env file
dotenv.config({path:'./config/config.env'});

const app=express();

// Connecting MongoDB
connectDB();

// Middleware
app.use(morgan('dev'));

// Body parser
app.use(express.json());

//Route files
app.use('/api/v1/bootcamps',bootcampRouter);

const PORT=4999;


const server=app.listen(PORT,console.log(`Server running on PORT -> ${PORT}`));

process.on('unhandledRejection',(error,promise)=>{
    console.log(`Error message: ${error.message}`);
    server.close(()=>process.exit(1));
});