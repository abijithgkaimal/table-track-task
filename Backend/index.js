
const JSONserver = require('json-server');


const tabletracktask = JSONserver.create();

const middleware = JSONserver.defaults();

const router = JSONserver.router("db.json");

const PORT = process.env.PORT || 5001;

tabletracktask.use(middleware);
tabletracktask.use(router);

tabletracktask.listen(PORT, () => {
  console.log(`Rtabletracktask JSON Server running at http://localhost:${PORT}`);
});
