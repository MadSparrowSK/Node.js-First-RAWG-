const Server = require('./Server/Server');
const PORT = 5000;

const parseUrl = require('./Server/middleware/parseUrl')
const send = require('./Server/middleware/send')

const router = require('./Server/src/users-router')

const server = new Server();

server.use(parseUrl('http://locahlhost:5000'));
server.use(send);

server.addRouter(router);

server.listen(PORT, () => console.log(`Server work on ${PORT} port`));
