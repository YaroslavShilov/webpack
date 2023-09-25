const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);
server.listen(9000, () => {
  console.log('JSON Server is running');
});
