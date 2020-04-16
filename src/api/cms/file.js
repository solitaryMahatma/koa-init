const Router = require('koa-router');
const { UploadToLocal } = require('../../core/uploader');
const router = new Router({
  prefix: '/api/upload'
});

const uploadToLocal = new UploadToLocal('/zg/avatar');

router.post('/', async ctx => {
  const files = await ctx.multer(ctx, {
    include: ['mp3'],
    singleLimit: 1024 * 1024 * 10
  });
  console.log(files);
  const result = await uploadToLocal.upload(files);
  console.log(result);
  ctx.json({
    errCode: 0,
    data: result
  });
});

module.exports = router;