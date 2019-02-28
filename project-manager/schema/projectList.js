/**
 ├── 数据表模型
 └── article.js
 */
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('project_list', {
        // 项目ID，自动递增
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
        // 正式地址
        formalAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'formalAddress',
        },
        // 测试地址
        testAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'testAddress',
        },
        // 接口文档
        rapAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'rapAddress',
        },
        // 蓝湖地址
        lhAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'lhAddress',
        },
        // 图标地址
        iconFontAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'iconFontAddress',
        },
        // gitlab地址
        gitLabAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'gitLabAddress',
        },
        // jenkins正式环境地址
        jenkinsFormalAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'jenkinsFormalAddress',
        },
        // jenkins测试环境地址
        jenkinsTestAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'jenkinsTestAddress',
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