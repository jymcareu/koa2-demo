
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '项目管理系统',
      dll: true,
      routes: {
        exclude: [

          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,

          /components\//,
          /common\//,
        ],
      },
      metas: [
        { charset: 'utf-8' },
      ],
      links: [
        { rel: 'stylesheet', href: './umi.css' },
        { rel: 'stylesheet', href: '//at.alicdn.com/t/font_748760_ihu2b0wu74k.css' },
        { rel: 'stylesheet', href: '//at.alicdn.com/t/font_604727_6bqoezdwt8h.css' },//康达库
        { rel: 'stylesheet', href: '//at.alicdn.com/t/font_801880_rl3r83tzoq9.css' },
      ],
    }],
  ],
  base: '/#/',
  history: 'hash',
  publicPath: './',
  proxy: {
    "/projectManager": {
      "target": "http://localhost:3000",
      "changeOrigin": true,
    }
  }
}
