const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const  route  = require('./routes/route');
const error = require('./middlewares/error');
const cookieParser = require('cookie-parser');

//config file
dotenv.config({path:path.join(__dirname,"config","config.env")});

//variables declaration
const PORT = process.env.PORT;
const ENV = process.env.APP_ENV;

//connecting data base
connectDatabase();

const app = express(); // create app


app.use(bodyParser.urlencoded({extended:false})) //get data from url
app.use(cookieParser())
app.use(express.json());// get and put json files

app.use(route);
app.use((req,res)=>{
    res.json({
       message : "404 Page Not Found"
    })
})
//for handling
app.use(error)

//listen port
 app.listen(PORT,()=>{
    console.log(`Server is listeing at ${PORT} in ${ENV}`)
})
