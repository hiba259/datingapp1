const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const matchRouter = require('./Routes/matches');      

const usersRouter = require('./Routes/Users');

const messageRouter = require('./Routes/messages');
const notificationRouter = require('./Routes/notification'); 


app.use('/users',usersRouter);
app.use('/matches',matchRouter);
app.use('/messages',messageRouter)
app.use('/notifications', notificationRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');

});