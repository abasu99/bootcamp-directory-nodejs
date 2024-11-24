const express=require('express');
const dotenv=require('dotenv');

dotenv.config({path:'./config/config.env'});
const app=express();
app.get('/',(req,res)=>{
    res.send('1st express-');
});
const port=process.env.PORT;


app.listen(port,console.log(`Server running on PORT -> ${port}`));