// 对koa-async-validator封装，自动抛出参数错误异常   https://github.com/carlitux/koa-async-validator
// 验证规则 https://github.com/validatorjs/validator.js
// 如果检验通过，则返回所有参数集合
// 对异常信息过滤处理

const _ = require('lodash');

// 校验器校验方法
async function valid () {
  let errors = await this.validationErrors();
  if (errors) {
    errors = _.uniqWith(errors, _.isEqual);
    throw new global.Ex.Params({
      errMsg: errors
    });
  } else {
    return _getParams(this);
  }
}

// 获取ctx中所有请求参数
function _getParams (ctx) {
  const headerOwnParams = [
    'host',
    'connection',
    'origin',
    'user-agent',
    'accept-language',
    'accept',
    'content-type',
    'content-length',
    'accept-encoding'
  ];
  const headers = _delAttrInObj(ctx.request.header, headerOwnParams);
  return {
    ...ctx.query,
    ...ctx.params,
    ...ctx.request.body,
    ...headers
  };
}

// 删除对象上的属性，@param(attrs) 属性数组
function _delAttrInObj (obj, attrs) {
  const _obj = _.clone(obj);
  attrs.map(attr => _.unset(_obj, attr));
  return _obj;
}

module.exports = valid;
