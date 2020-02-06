const express = require('express');
const app = express();
const server = require('http').Server(app);
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const deleteRouter = require('./routers/delete');
const apiRouter = require('./routers/api');
const uploadRouter = require('./routers/upload');
const loginRouter = require('./routers/login');
const restoreRouter = require('./routers/restorePass');
const confirmRouter = require('./routers/confirmEmail');
const hbs = require('hbs');
const path = require('path');
const io = require('socket.io')(server);

const {port} = require('./config');

require('./mangoose');

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(deleteRouter);
app.use(apiRouter);
app.use(loginRouter);
app.use(uploadRouter);
app.use(restoreRouter);
app.use(confirmRouter);

let clientCount = 0;

io.on('connection', (socket) => {
  console.log(`Create new socket with ID: ${socket.id}`);
  clientCount = socket.server.engine.clientsCount;

  console.log(clientCount)

  socket.on('sendMess', (msg) => {
    console.log(msg)

    io.emit('addMess', {msg})
  });

  io.emit('clientCount', clientCount);

  socket.broadcast.emit('user connected' , 'name');

  socket.on('disconnect', function () {
    clientCount = socket.server.engine.clientsCount;
    io.emit('clientCount', clientCount);
  });

});

server.listen(port, () => console.log(`Start listening on port ${port}!`));





