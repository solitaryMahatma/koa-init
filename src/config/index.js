const config = {
  app: {
    domain: 'http://localhost:3000',
    port: 3000,
    staticPath: `${process.cwd()}/static`
  },
  dataBase: {
    dbName: 'xixi',
    host: '122.51.67.38',
    port: 3306,
    user: 'root',
    password: 'Zwb123123@'
  },
  file: {
    storeDir: `${process.cwd()}/static`,
    singleLimit: 1024 * 1024 * 2,
    totalLimit: 1024 * 1024 * 20,
    nums: 10,
    // exclude: ['jpeg']
    include: ['jpeg1', 'png']
  },
  logs: {
    baseLogPath: `${process.cwd()}/logs`,
    detail: true // 是否在控制台显示请求详情
  }
};

module.exports = config;