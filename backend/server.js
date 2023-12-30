const express = require("express");
const dotenv = require('dotenv');
const connectDb = require('./config/db')
dotenv.config();

connectDb();
const app = express();
app.get('/', (req, res) => {
    res.status(200).send("API is Running");
});
app.get('/api/chat',(req,res)=>{
    res.status(200).send(["Raghav","Kashyap"]);
})
const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server started at PORT ${PORT}`))