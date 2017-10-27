# cart-demo
1. 本项目实现的功能：

      1.1 购物车的商品数据从 json 文件获取。假设已经从后台获取到了 json 数据。
  
      1.2 用户可以对购物车里的各项操作全选、反选，增加数量、减少数量（限定大于等于1），删除某个商品。
  
      1.3 实时计算商品数量和金额。
  
      1.4 限制结账功能：只有在总金额大于0时，用户才能点击结算按钮跳转。

2. npm run build 打包项目时产生的问题。在尝试了各种方法以后，包括重新创建项目，重新npm install等，问题还多了一个：无法打包images文件。

      尝试过的方法：
  
        2.1 修改config - index.js文件：build下的 assetsPublicPath: './',这里多加一个点。也有建议直接改成 assetsPublicPath: '.'。
      
        2.2 修改config - index.js文件：productionScourceMap：true，这里的 true 改成 false。
      
        2.3 build - utils.js文件：增加一个路径 publicPath:'../../' 
      
 
            if (options.extract) {
        
                return ExtractTextPlugin.extract({
            
                    use: loaders,
              
                    fallback: 'vue-style-loader',
              
                    publicPath:'../../'   //这一行是新增的。反正我失败了。并且现在出现了 image 无法打包的问题！气死了！
              
              })


3. 开发时的问题：

          3.1 通过从methods写函数的方式来判断全选反选、用 watch 方法监控购物车变化。出现全选与取消全选的逻辑反过来的情况。未解决这个逻辑问题，并导致后面的计算总额出现逻辑混乱。
          
         3.2 以上事件用computed来进行实时计算

4. 创建本项目时，遇到的坑：http://www.cnblogs.com/dodocie/p/7714908.html 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
