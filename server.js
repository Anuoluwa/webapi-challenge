import express from 'express';
import routes from './api'
import logger from './middlewares/logger'


const server = express();
server.use(express.json());
server.use(logger);


server.use('/api', routes);

server.get('/', (req, res) => {
  res.json(`<h2>Welcome to Projects & Actions API</h2>`)
});


server.all('*', (req, res) => {
  res.json(`
    Sorry, invalid routes, try again!
  `);
});

export default server;