const { secretKey } = require('./configs').webToken;


module.exports = (io) => {
    let usersSockets = [];
    let usersOnline = [];




    io.on('connection', (socket) => {
        console.log('Someone connected to us!');

        socket.on('LOGIN', () => {


        });
        socket.on('LOGOUT', () => {

        });

        socket.on('disconnect', () => {
            console.log('Someone disconnects from us!');

        });
    });
}

