var mysql = require('mysql');   // 引用mysql模块

let config = {
    host: '127.0.0.1',      // MySQL所在服务器IP
    user: 'root',           // 用户名
    password: '',           // 密码
    database:'yxpblog',      // 数据库名称
    port: 3306,             // 端口号
    dateStrings: true,      // 时间以字符串形式显示，否则会有类似这样的显示：Thu Apr 14 2016 00:00:00 GMT+0800 (中国标准时间) 17:20:12
};

var db = function () {};

db.prototype.pool = mysql.createPool(config);
db.prototype.query = function (sql, params) {
  return new Promise((resolve, reject) => {
    this.pool.getConnection((error, connection) => {
      if (error) {
        reject('数据库连接错误');
        return;
      }

      if (params === undefined) params = [];
      connection.query(sql, params, (error, result) => {
        if (error) {
          reject('语句执行失败');
          return;
        }

        // 释放连接
        connection.release();
        resolve(result);
      });
    })
  })
};

module.exports = new db();
