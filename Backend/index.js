// import json-server
const JSONserver = require('json-server');

// create server for running json file
const TableTrackerServer = JSONserver.create();

// create middleware
const middleware = JSONserver.defaults();

// import db.json file
const router = JSONserver.router('db.json');

// define port to run the server
const PORT = process.env.PORT || 5001;

// use middleware
TableTrackerServer.use(middleware);

// use router
TableTrackerServer.use(router);

// tell server to listen on all network interfaces
TableTrackerServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Table Tracker JSON Server started at PORT number ${PORT}`);
});