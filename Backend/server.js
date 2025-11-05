
const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5001;
app.use(middlewares);
app.use(router);
app.listen(PORT, () => {
  console.log(`✅ Table Tracker JSON Server running on port ${PORT}`);
});
