const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/CURDDEMO',{useNewUrlParser:true})
mongoose.Promise = global.Promise;

app.use('/user',userRoutes);

app.listen(5000,console.log('Running at 5000'));
