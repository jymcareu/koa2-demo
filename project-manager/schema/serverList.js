/**
 ├── 数据表模型
 └── article.js
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('server_list', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 项目名称
        projectName: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'projectName',
        },
        // 内网Ip
        IntranetIP: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'IntranetIP',
        },
        // 外网Ip
        networkIp: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'networkIp',
        },
        // 账号
        username: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'username',
        },
        // 密码
        password: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'password',
        },
        // 备注
        remark: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'remark',
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}