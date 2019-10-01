const express = require('express');
const server = express();

const hubsRouter = require('./routes/hubs-router.js');

server.use(express.json());

server.use('/api/posts', hubsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Heorhii API</h>
      <p>Welcome to the Heorhii API</p>
    `);
  });
  
const port = 5050;

server.listen(port, () => {
    console.log('\n*** Server Running on http://localhost:5050 ***\n');
});