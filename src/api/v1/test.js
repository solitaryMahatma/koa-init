const Router = require('koa-router');
const { TestModel } = require('../../models/test')

const router = new Router({
  prefix: '/api/test'
});

router.get('/', async ctx => {
    await TestModel.create({
        color: '89'
    })
    ctx.success({
        msg: '创建成功'
    })
}) 

module.exports = router