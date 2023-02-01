const path = require('path')
const FontMin = require('fontmin')

const pluginName = 'FontPlugin'

function getMiniFont(options) {
    const defaultOps = {
        originFontPath: path.resolve('./output'),
        symbol: path.resolve('./output/symbol.json'),
        outputFontPath: path.resolve('./output')
    }

    const ops = {...defaultOps, ...options}

    const text = ops.symbol.data.toString()

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
            console.error(err);
        }
        console.log('done');
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
