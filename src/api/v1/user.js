const Router = require('koa-router');

const { UserModel } = require('../../models/user');

const router = new Router({
  prefix: '/api/user'
});

router.post('/signup', async ctx => {
  ctx.check('nickName', '昵称是长度必须在2-10之间的字符串').isString().isLength({ min: 2, max: 10 });
  ctx.check('phoneNumber', 'phoneNumber不合法').isMobilePhone(['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW']);
  ctx.check('email', '邮箱格式不对啊').optional().isEmail();
  ctx.check('password', '只支持长度为6-18的数字、字母、下划线组合').matches(/^(\w){6,18}$/);

  const { nickName, phoneNumber, email, password } = await ctx.valid();
  await UserModel.signUp({ nickName, phoneNumber, email, password });
  ctx.success({ errMsg: '注册成功!' });
});

router.post('/signin', async ctx => {
  ctx.check('phoneNumber', 'phoneNumber不合法').isMobilePhone(['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW']);
  ctx.check('password', '只支持长度为6-18的数字、字母、下划线组合').matches(/^(\w){6,18}$/);

  const { phoneNumber, password } = await ctx.valid();
  await UserModel.signIn({ phoneNumber, password });
  ctx.success({
    errMsg: '登录成功!'
  });
});

router.put('/', async ctx => {
  // await UserModel.restore({
  //   where: {
  //     name: 'testName'
  //   }
  // });
  // await TestModel.update({
  //   deletedAt: ''
  // }, {
  //   where: {
  //     name: 'testName'
  //   }
  // });
});

router.del('/', async ctx => {

});

module.exports = router;