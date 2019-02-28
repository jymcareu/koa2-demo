/**
 ├── controllers
 └── projectList.js
 */
const ProjectListModel = require('../modules/projectList');
const db = require('../config/db');
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const ProjectList = Sequelize.import('../schema/projectList');

class articleController {
    /**
     * 创建项目
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        if (req.projectName) {
            try {
                // 查询项目是否存在
                let categoryDetail = await ProjectList.findOne({
                    where: {
                        projectName: req.projectName,
                    },
                });
                if (categoryDetail) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 1,
                        err: '已存在该项目',
                        data: null
                    }
                    return false;
                }
                // 创建项目模型
                const ret = await ProjectListModel.createProject(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await ProjectListModel.getProjectDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    err: '创建项目成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 1,
                    err: '创建项目失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                err: '参数不齐全',
            }
        }

    }

    /**
     * 更新项目
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateProject(ctx) {
        let req = ctx.request.body;
        let id = req.id;
        if (id) {
            await ProjectListModel.updateProject(id, req);
            let data = await ProjectListModel.getProjectDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                err: '更新成功',
                data
            }
        } else {
            ctx.response.status = 200;
            ctx.body =  {
                code: 1,
                err: '缺少项目id',
            }
        }
    }

    /**
     * 获取项目列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getProjectList(ctx) {
        let params = ctx.query;
        try {
            const data = await ProjectListModel.getProjectList(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                err: '查询成功',
                data
            }
        } catch (e) {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                err: '查询失败',
                data:e
            }
        }
    }

    /**
     * 查找项目
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async searchProject(ctx) {
        try {
            let data = await ProjectListModel.searchProject(ctx.query);
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                err: '查询项目成功',
                data
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                err: '查询失败',
                data: err
            }
        }
    }

    /**
     * 删除项目
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async deleteProject(ctx) {
        let id = ctx.query.id;
        if (id && !isNaN(id)) {
            try {
                await ProjectListModel.deleteProject(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    err: '删除成功',
                    data: null
                }
            } catch (err) {
                ctx.response.status = 200;
                ctx.body ={
                    code: 1,
                    err: '删除失败',
                    data: null
                }
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                err: '缺少项目id',
                data: null
            }
        }
    }

    /**
     * 获取项目详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询项目详情模型
                let data = await ProjectListModel.getProjectDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    err: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 1,
                    err: '查询失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                err: '缺少项目id'
            }
        }
    }
}

module.exports = articleController