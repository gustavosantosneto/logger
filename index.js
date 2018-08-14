module.exports = (config) => {
    var fs = require('fs')
    var util = require('util')

    !fs.existsSync(`.${config.Log.path}`) && fs.mkdirSync(`.${config.Log.path}`)

    //let log_stdout = process.stdout

    const log = async (level, text, object) => {
        if (config.Log.enableds.indexOf(level) === -1) return

        !fs.existsSync(`.${config.Log.path}${level}`) && fs.mkdirSync(`.${config.Log.path}${level}`)
        const log_file = fs.createWriteStream(`.${config.Log.path}${level}/${level}-${new Date().toISOString().substring(0, 13).replace('T', '-')}.log`, { flags: 'a' })
        //const formatedText = `\n[${new Date().toISOString().replace('T', ' ').replace('Z', '')}] ${util.format(text)} ${typeof object === 'object' ? JSON.stringify(util.inspect(object)) : (object || '')}`
        const formatedText = `\n[${new Date().toISOString().replace('T', ' ').replace('Z', '')}] ${util.format(text)} ${typeof object === 'object' ? JSON.stringify(object) : (object || '')}`
        log_file.write(formatedText)
        //log_stdout.write(formatedText)
        console.log((config.Log.colors[level] || '\x1b[30m'), formatedText)
        console.log((config.Log.colors[level] || '\x1b[30m'))
    }

    const logger = {
        info: (text, object) => { log('info', text, object) },
        error: (text, object) => { log('error', text, object) },
        debug: (text, object) => { log('debug', text, object) },
    }

    return logger
}