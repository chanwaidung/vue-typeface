# About
When we are using some art typeface in website, maybe that typeface is large.
This tool will help you decrease the size of typeface, and then you can upload 
the target typeface to CDN.
# 1️⃣ Install

```shell
npm i vue-typeface -D
```

# 2️⃣ Config
Open vue.config.js and add this code to extract the symbol.
In default, this loader will output Chinese symbol to folder
```/output/symbol.json```
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
# 3️⃣ Options
This loader can receive an object param
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
### output
Setting the symbol output to target folder.
### filename
Setting the name of output file.
### express
Setting the rule to extract text. It is a RegExp

# 4️⃣ Config @vue-typeface/font-plugin

Open this file ```vue.config.js```, and add this code to plugins option.

In default, this tool will use this path ```output/symbol.json``` to set default
symbol. The target file will generate to the folder ```output/```

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

# 5️⃣ @vue-typeface/font-plugin Option

You can set an object param to this plugin

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

Setting the original font for input.

### option.symbolPath

Setting the symbol path.

### option.outputFontPath

Setting the generation font path.
