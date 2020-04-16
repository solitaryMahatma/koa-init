const router = require('koa-router')()
const shell = require('shelljs')
const WEBHOOK = '/webhook'
router.post(WEBHOOK, () => {
  shell.cd(process.cwd())
  shell.exec('echo build staring...')
  shell.exec('git fetch --all')
  shell.exec('git reset --hard origin/master')
  shell.exec('git pull')
  shell.exec('npm i')
  shell.exec('pm2 restart index.js')
  shell.exec('echo build end!')
})

module.exports = router