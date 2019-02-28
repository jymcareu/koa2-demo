/**
 ├── modules  模型
 └── 服务器列表
 */

const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;

const ServerList = Sequelize.import('../schema/serverList');
// 自动创建表
ServerList.sync({force: false,alter:true});

class ArticleModel {
    /**
     * 创建服务器模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createServer(data) {
        return await ServerList.create({
            projectName: data.projectName, // 项目名称
            IntranetIP: data.IntranetIP, // 内网ip
            networkIp: data.testAddress, // 外网ip
            username: data.username, // 账号
            password: data.password, // 密码
            remark: data.remark, // 备注
        })
    }

    /**
     * 更新服务器数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateServer(id, data) {
        await ServerList.update({
            projectName: data.projectName, // 项目名称
            IntranetIP: data.IntranetIP, // 内网ip
            networkIp: data.networkIp, // 外网ip
            username: data.username, // 账号
            password: data.password, // 密码
            remark: data.remark, // 备注
        }, {
            where: {
                id
            },
            fields: ['projectName', 'IntranetIP', 'networkIp', 'username', 'password', 'remark']
        });
        return true
    }

    /**
     * 获取服务器详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getServerDetail(id) {
        return await ServerList.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 搜索
     * @param params
     * @return {Promise<void>}
     */
    static async searchServer(params) {
        return await ServerList.findAll({
            'order': [
                ['id', 'DESC']
            ],
            where: {
                projectName: {
                    // 模糊查询
                    [Op.like]: '%' + params.projectName + '%'
                }
            },
            attributes: {exclude: ['content']}
        });
    }

    /**
     * 获取列表
     * @returns {Promise<*>}
     */
    static async getServerList(params) {
        return await ServerList.findAll({
            raw: true,
            'order': [
                ['id', 'DESC']
            ],
            attributes: {exclude: ['content']}
        })
    }

    /**
     * 删除服务
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteServer(id) {
        await ServerList.destroy({
            where: {
                id,
            }
        });
        return true
    }
}

module.exports = ArticleModel;