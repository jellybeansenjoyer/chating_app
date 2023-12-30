const mongoose = require("mongoose");
const connectDb = async () =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://raghav:raghav@raghav.jvmxdco.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`Error: ${err}`)
        process.exit();
    }
}

module.exports=connectDb;