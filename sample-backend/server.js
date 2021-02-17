const app = require('./service');
const Server = require('serverbuilder');
const options = {
  name: 'Reactive Server'
};

const server = new Server(app, process.env.PORT || 3e3, options);
server.run().then((serv) => app.set('port', serv.port), console.error);
