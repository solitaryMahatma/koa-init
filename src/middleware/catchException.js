// 中间件异常处理
/*
* return code errMsg     code.md
*/
const errLogger = require('../core/logs').errLogger;

const catchException = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    errLogger.error(e);
    ctx.status = e.statusCode || 400;
    ctx.body = {
      errCode: e.errCode || 999,
      errMsg: e.errMsg || '服务器挂啦'
    };
  }
};

module.exports = catchException;