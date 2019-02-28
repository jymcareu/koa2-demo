/**
 ├── routes
 └── index.js
 */
const Router = require('koa-router')
const ArticleController = require('../controllers/projectList');
const serverController = require('../controllers/serverList');

const router = new Router({
    prefix: '/projectManager'
})

// 创建项目接口（路由）
router
    .post('/projectList/save',ArticleController.create) // 创建项目
    .get('/projectList/searchProject', ArticleController.searchProject) // 获取项目
    .get('/projectList/delete', ArticleController.deleteProject) // 删除项目
    .post('/projectList/update', ArticleController.updateProject)   // 修改项目
    .post('/serverList/save',serverController.createServer) // 创建项目
    .get('/serverList/searchServer', serverController.searchServer) // 获取项目
    .get('/serverList/delete', serverController.deleteServer) // 删除项目
    .post('/serverList/update', serverController.updateServer);   // 修改项目


module.exports = router
