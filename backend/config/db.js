import mongoose from "mongoose";
const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`Error: ${err}`)
        process.exit();
    }
}

module.exports=connectDb;