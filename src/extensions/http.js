const { Success } = require('../core/httpResponse');

function success (app) {
  app.context.success = function (ex) {
    this.type = 'application/json';
    const suc = new Success(ex);
    this.status = suc.statusCode;
    const data = {
      errCode: suc.errCode,
      errMsg: suc.errMsg
    };
    this.body = JSON.stringify(data);
  };
}

function json (app) {
  app.context.json = function (objData) {
    this.type = 'application/json';
    this.status = 200;
    this.body = JSON.stringify({
      errCode: 0,
      data: objData
    });
  };
}

module.exports = {
  success,
  json
};