const fs = require('fs')
const path = require('path')

module.exports = function (content, map, meta) {
    let chinese = new Set

    const defaultOps = {
        output: path.resolve('./output'),
        filename: 'symbol.json',
        express: /[\u4E00-\u9FA5\uF900-\uFA2D]/g,
    }

    const ops = { ...defaultOps, ...this.query }

    const filepath = `${ops.output}/${ops.filename}`

    if(!fs.existsSync(ops.output)) {
        fs.mkdirSync(ops.output)
    }

    if(fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf8')

        // parse JSON string to JSON object
        const config = JSON.parse(data)
        chinese = new Set(config.data)
    }

    const result = { data: [] }

    const isChinese = function (data) {
        return ops.express.test(data)
    }

    for(let i of content) {
        const specialCode = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6',
            '7', '8', '9',
            `~！@#￥%……&*（）——+「」|："《》？~!@#$%^&*()_+{}|:"?><,./;'\][`
        ]
        specialCode.forEach(function (item) {
            chinese.add(item)
        })
        if(isChinese(i)) {
            chinese.add(i)
        }
    }

    result.data = Array.from(chinese)

    fs.writeFileSync(filepath, JSON.stringify(result))

    return content
}
