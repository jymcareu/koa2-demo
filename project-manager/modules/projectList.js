/**
 ├── modules  模型
 └── article.js
 */

const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;

const ProjectList = Sequelize.import('../schema/projectList');
// 自动创建表
ProjectList.sync({force: false});

class ArticleModel {
    /**
     * 创建项目模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createProject(data) {
        return await ProjectList.create({
            projectName: data.projectName, // 项目名称
            formalAddress: data.formalAddress, // 正式地址
            testAddress: data.testAddress, // 测试地址
            lhAddress: data.lhAddress, // 测试地址
            rapAddress: data.rapAddress, // 接口文档
            iconFontAddress: data.iconFontAddress, // 图标地址
            gitLabAddress: data.gitLabAddress, // gitlab地址
            jenkinsFormalAddress: data.jenkinsFormalAddress, // jenkins正式环境地址
            jenkinsTestAddress: data.jenkinsTestAddress, // jenkins测试环境地址
        })
    }

    /**
     * 更新项目数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateProject(id, data) {
        console.log("data:",data);
        await ProjectList.update({
            projectName: data.projectName, // 项目名称
            formalAddress: data.formalAddress, // 正式地址
            testAddress: data.testAddress, // 测试地址
            lhAddress: data.lhAddress, // 测试地址
            rapAddress: data.rapAddress, // 接口文档
            iconFontAddress: data.iconFontAddress, // 图标地址
            gitLabAddress: data.gitLabAddress, // gitlab地址
            jenkinsFormalAddress: data.jenkinsFormalAddress, // jenkins正式环境地址
            jenkinsTestAddress: data.jenkinsTestAddress, // jenkins测试环境地址
        }, {
            where: {
                id
            },
            fields: ['projectName', 'formalAddress', 'testAddress', 'lhAddress', 'rapAddress', 'iconFontAddress', 'gitLabAddress', 'jenkinsFormalAddress','jenkinsTestAddress']
        });
        return true
    }

    /**
     * 获取项目详情数据
     * @param id  项目ID
     * @returns {Promise<Model>}
     */
    static async getProjectDetail(id) {
        return await ProjectList.findOne({
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
    static async searchProject(params) {
        return await ProjectList.findAll({
            raw: true,
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
        })
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getProjectList(params) {
        return await ProjectList.findAll({
            raw: true,
            'order': [
                ['id', 'DESC']
            ],
            attributes: {exclude: ['content']}
        })
    }

    /**
     * 删除项目
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteProject(id) {
        await ProjectList.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = ArticleModel;