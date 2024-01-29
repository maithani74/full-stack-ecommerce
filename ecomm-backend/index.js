const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan')
const {connectDB} = require('./config/db')
const authRouter = require('./routes/authRoute')
const cors = require('cors')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


//database connection
connectDB();

//configure env
dotenv.config();

//routes
app.use('/api/v1/auth',authRouter.router)
app.use('/api/v1/category',categoryRouter.router)
app.use('/api/v1/product',productRouter.router)
//rest apis
app.get("/",(req,res)=>{
    res.send("<h1>Hello giez</h1>")
})
const PORT  = process.env.PORT
app.listen(PORT,()=>{
    console.log(`${process.env.dev_mode} Server started on ${PORT}`);
})