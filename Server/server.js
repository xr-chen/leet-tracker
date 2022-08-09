const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const user = require("./routes/user");

const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.DEV_DB)
    .then(() => console.log("DB connected"))
    .catch(err => {
        console.log(err);
    })

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

app.use(cors({origin: "*"}))

app.use("/user", user);

app.post("/save-products", (req, res) => {
    console.log("req.body in save=products route: ", req.body);
    res.send('all good in the hood');
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})