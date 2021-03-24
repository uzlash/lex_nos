'use strict';
const RedisCon = require('./connections/redisCon');
require('./connections/connection.mongo')();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const tokenMiddleware = require('./middlewares/middleware.token').tokenMiddleware;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(__dirname + '/www'));
const server = http.createServer(app);
const io = require('socket.io')(server)
require('./ioEngine')(io);

//Auth Route
const authRoute = require('./routes/route.auth')(io);
app.use('/api/v1/auth', authRoute);
//Token Middleware
app.use(tokenMiddleware());
//User Rooute
const userRoute = require('./routes/route.user')(io);
app.use('/api/v1/user', userRoute);
//Centre Rooute
const centreRoute = require('./routes/route.centre')(io);
app.use('/api/v1/centre', centreRoute);


server.listen(3000, () => {
    console.log('User Microservice listening on port 3000');
});
