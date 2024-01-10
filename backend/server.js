const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors')
const connectDb = require('./config/db')
const chatRoutes = require('./routes/chatRoutes');
const messageRouters = require('./routes/messageRoutes');
dotenv.config();
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
connectDb();
const app = express();
app.use(express.json()); //to access json data
app.get('/', (req, res) => {
    res.status(200).send("API is Running");
});
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRouters)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server started at PORT ${PORT}`.yellow.bold))