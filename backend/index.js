const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/api',require('./routes/user'));


app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
});