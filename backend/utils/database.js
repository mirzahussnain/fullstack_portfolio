const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config({path:"./config/config.env"})

const connectToDatabase=()=>{
    
    mongoose.connect(process.env.MONGO_URI).then((response)=>{
        console.log(`Database Connected`);

    }).catch((error)=>{
        console.log(error);
    })
}

module.exports.dc=connectToDatabase;