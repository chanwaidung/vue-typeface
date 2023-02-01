const fs = require('fs')
const path = require('path')
const FontMin = require('fontmin')

const pluginName = 'FontPlugin'

const parseJSON = function (data) {
    let result = null
    try {
        result = JSON.parse(data)
    }
    catch(e) {
        throw new Error(e)
    }
    return result
}

function getMiniFont(options) {
    const defaultOps = {
        originFontPath: path.resolve('./output'),
        symbolPath: path.resolve('./output/symbol.json'),
        outputFontPath: path.resolve('./output')
    }

    const ops = {...defaultOps, ...options}

    console.log('ops: ', ops)

    if(!fs.existsSync(ops.symbolPath)) {
        throw new Error('symbolPath is required')
    }

    const content = parseJSON(fs.readFileSync(ops.symbolPath, { encoding: 'utf8' }))

    if(!content) {
        console.log('字符集为空，终止字体压缩')
        return
    }

    const text = content.data.toString()

    const instance = new FontMin()
        .src(ops.originFontPath)
        .use(FontMin.glyph({text}))
        .use(FontMin.ttf2eot())
        .use(FontMin.ttf2woff())
        .use(FontMin.ttf2woff2())
        .use(FontMin.ttf2svg())
        .use(FontMin.css())
        .dest(ops.outputFontPath)

    instance.run(function (err, files, stream) {
        if (err) {
            console.error(`vue-typeface: 字体压缩失败，${err}`)
            return
        }
        console.log(`vue-typeface: 字体压缩成功，${ops.outputFontPath}`);
    })
}

class FontPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        const { options } = this
        compiler.hooks.done.tap(pluginName, function (callback) {
            getMiniFont(options)
        })
    }
}

module.exports = FontPlugin
