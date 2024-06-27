const dotenv=require('dotenv')
const express=require('express');
const connectDatabase=require('./utils/database.js').dc
const userRoutes=require('./routes/User.js').userRoutes
const cookieParser=require('cookie-parser')
const expressSession=require('express-session')
const auth=require('./middlewares/authentication.js').isAuthenticated
const authorized=require('./middlewares/authorization.js').isAuhtorized
const cors=require('cors')
const cloudinary=require('cloudinary')

dotenv.config({path:"./config/config.env"})
cloudinary.config({
   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_SECRET_KEY, 
})

const app=express()

// Timeout middleware
const TIMEOUT = 60000; // 60 seconds

app.use((req, res, next) => {
  res.setTimeout(TIMEOUT, () => {
    res.status(503).json({ error: "Request timed out" });
  });
  next();
});

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use(cookieParser())

const allowedOrigins = process.env.ORIGIN_URL;

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if ( allowedOrigins.includes(origin) || !origin ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,// Allow credentials (cookies) to be sent with requests
  }))

app.use("/user",expressSession({
  secret:process.env.EXPRESS_SESSION_SECRET,
  resave:true,
  saveUninitialized: true
}))

app.use("/user",userRoutes)
app.use("/user/admin/*",auth,authorized)

app.listen(process.env.PORT,()=>{
  console.log(`Server Started`)
})
connectDatabase()

module.exports=app
