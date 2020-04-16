const Router = require('koa-router');
const { CmsUser } = require('../../models/cmsUser');
const { AddUser } = require('../../models/adduser')
const {Token} = require('../../core/token')
const token = new Token()
const router = new Router({
    prefix: '/api/cmsuser'
});

router.post('/login', async ctx => {
    
    ctx.check('userName', '用户名长度5-9个字符').isLength({ max: 9, min: 5 })
    ctx.check('password', '只支持长度为6-18的数字、字母、下划线组合').matches(/^(\w){6,18}$/)
    const _data = await ctx.valid()
    const {userName} = _data
    const _user = await CmsUser.findOne({where:{userName}})
    if (_userName) {
        const corrPwd = bcrypt.compareSync(userName, _user.userName);
        if (!corrPwd) {
            throw new global.Ex.Fail({
                errCode: 20200,
                errMsg: "密码不正确"
            }) 
        }
    } else {
        throw new global.Ex.Fail({
            errCode: 20000,
            errMsg: "用户不存在"
        })
    }
    const {id} = _user
    const signToken = token.sign({id})
    ctx.json({
        token: signToken,
        errMsg: '登录成功!'
    })
});

router.post('/register', async ctx => {
    ctx.check('userName', '用户名长度5-9个字符').isLength({ max: 9, min: 5 })
    ctx.check('password', '只支持长度为6-18的数字、字母、下划线组合').matches(/^(\w){6,18}$/)
    const _data = await ctx.valid()
    const {userName} = _data
    const _userName = await CmsUser.findOne({where:{userName}})
    console.log(JSON.stringify(_userName));
    if (_userName) {
        throw new global.Ex.Fail({
            errCode: 20100,
            errMsg: "用户已存在"
        })
    } else {
        await CmsUser.create(_data)
        ctx.success({
            errMsg: '注册成功!'
        });
    }
    

});


router.post('/adduser', async ctx=>{
    console.log(ctx.request.body, '_data');
    ctx.check('nickName', '真实姓名不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('encoding', '编码不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('trade', '行业不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('job', '职业不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('city', '城市不能为空').isEmpty({ ignore_whitespace:false })
    const _data = await ctx.valid()
    const a = await AddUser.create(_data)
    ctx.json(a);
})
router.put('/adduser', async ctx=>{
    ctx.check('nickName', '真实姓名不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('encoding', '编码不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('trade', '行业不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('job', '职业不能为空').isEmpty({ ignore_whitespace:false })
    ctx.check('city', '城市不能为空').isEmpty({ ignore_whitespace:false })
    const _data = await ctx.valid()
    await AddUser.update(_data)
    ctx.success({
        errMsg: '添加成功!'
    });
})
router.get('/adduser', async ctx=>{
    const all = await AddUser.findAll()
    ctx.json(all);
})
router.delete('/adduser', async ctx=>{
    const {id}  = ctx.request.body
    await AddUser.destroy({
        where:{
            id
        }
    })
    ctx.success({
        errMsg: '删除成功!'
    });
})

module.exports = router;