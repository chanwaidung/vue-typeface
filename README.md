# 关于

当我们使用一些艺术字的时候，这些艺术字可能会占据很大的体积，导致我们的站点首屏加载
速度过慢。

这个工具会帮助在开发的时候将用到的字体抽离出来，达到减少字体体积的效果。

# 1️⃣ 安装

```shell
npm i vue-typeface -D
```

# 2️⃣ 配置chinese-loader

打开文件```vue.config.js```，将以下代码添加至loader中。

默认情况下这个工具将会提取中文字符到```output/symbol.json```中。

```js
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('@vue-typeface/chinese-loader')
            .loader('@vue-typeface/chinese-loader')
            .end()
    }
}
```

# 3️⃣ chinese-loader的可选入参

这个loader允许你传入一个Object型参数，用来控制一些基础功能：

```javascript
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('@vue-typeface/chinese-loader')
            .tap((option)=> {
                return {
                    output: path.resolve('./output'),
                    filename: 'symbol.json',
                    express: /[\u4E00-\u9FA5\uF900-\uFA2D]/g,
                }
            })
            .loader('@vue-typeface/chinese-loader')
            .end()
    }
}
```

### option.output

设置目标文件的输出路径

### option.filename

设置目标文件的输出名

### option.express

自定义正则表达式，以筛选文字

# 4️⃣ 配置font-plugin

打开文件```vue.config.js```，将以下代码添加至plugins配置中。

默认情况下这个工具将会使用```output/symbol.json```文件作为字符集。默认输出至
```output/```文件夹下。

```javascript
const FontPlugin = require('@vue-typeface/font-plugin')
module.exports = {
    configureWebpack: {
        plugins: [
            new FontPlugin(),
        ]
    }
}
```

# 5️⃣ font-plugin的可选入参

这个plugin允许你传入一个Object型参数，以实现一些基础功能：

```javascript
const FontPlugin = require('@vue-typeface/font-plugin')
module.exports = {
    configureWebpack: {
        plugins: [
            new FontPlugin({
                originFontPath: path.resolve('./font/Muyao-Softbrush-2.ttf'),
                symbolPath: path.resolve('./output/symbol.json'),
                outputFontPath: path.resolve('./output')
            }),
        ]
    }
}
```

### option.originFontPath

设置原始字体路径。

### option.symbolPath

设置字符集合

### option.outputFontPath

设置压缩字体文件输出路径
