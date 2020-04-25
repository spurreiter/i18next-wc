/**
 * toggles to CDN or local scripts
 */

const fs = require('fs')

const dir = `${__dirname}/../examples`

const files = [
  'datetime.html',
  'message-icu.html',
  'message-plurals.html',
  'message.html',
  'number.html',
  'relative-time.html'
]

const comment = str => str.replace(/^(\s*)(<.*>)(\s*?)$/, `$1<!-- $2 -->$3`)
const uncomment = str => str.replace(/<!--\s*/, '').replace(/\s*-->/, '')

const changeFile = (file, isLocal) => {
  const reCdn = /<script.* src="https:\/\/unpkg.com\/i18next-wc\/dist\//
  const reDist = /<script.* src="..\/dist\//
  const filename = `${dir}/${file}`
  const content = fs.readFileSync(filename, 'utf8')
  const changed = content.split(/\n/).map(line => {
    if (reCdn.test(line)) {
      line = uncomment(line)
      if (isLocal) line = comment(line)
    } else if (reDist.test(line)) {
      line = uncomment(line)
      if (!isLocal) line = comment(line)
    }
    return line
  }).join('\n')
  if (content !== changed) {
    fs.writeFileSync(filename, changed, 'utf8')
  }
}

const changeAll = (isLocal) => {
  for (let file of files) {
    changeFile(file, isLocal)
  }
}

const argv = process.argv.slice(2)

changeAll(argv.includes('--local'))
