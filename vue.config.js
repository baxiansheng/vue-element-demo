module.exports = {
  /* 部署应用包的基本URL */
  /* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
  //  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
  publicPath: "/",

  /* 生产环境构建文件的目录 defalut: dist */

  outputDir: "dist",

  /* 放置生成的静态文件目录（js css img） */

  assetsDir: "static",

  devServer: {
    port: 8899,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      [""]: {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          ["^" + ""]: "",
        },
      },
    },
  },
};
