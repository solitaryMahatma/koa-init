const Koa = require('koa');
const app = new Koa();
const consola = require('consola');
const { port } = require('./config').app;

const InitManager = require('./core/initApp');

InitManager.init(app);
app.listen(port, () => {
  consola.ready(`Server Running! Port at ${port}`);
});

exports.app = app;
