require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const userRouter = require('./routes/userRoute');

app.use('/users', userRouter)

mlabUsername = process.env.MLAB_USERNAME;
mlabPassword = process.env.MLAB_PASSWORD;

mongoose.connect(`mongodb://${mlabUsername}:${mlabPassword}@ds245532.mlab.com:45532/todo-fancy`, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected todo-fancy db!`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})