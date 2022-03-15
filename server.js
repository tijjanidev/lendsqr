const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const cors = require('cors');


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = express()

  server.use(cors());

  server.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");next();
  });  

  server.use(bodyParser.json())
  
  const routes = require('./api/routes.js');

  server.use('/api/',routes);
  
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(8080, (err) => {
    if (err) throw err
    console.log('Ready on port ::8080')
  })
}).catch( ex => {
    console.error(ex.stack);
    process.exit(1);
})
