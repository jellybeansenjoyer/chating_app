const express = require("express");
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.get('/', (req, res) => {
    res.send("API is Running");
});

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server started at PORT ${PORT}`))