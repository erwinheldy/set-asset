#!/usr/bin/env node

const fs = require('fs')
const { resolve } = require('path')
const { parseHTML } = require('linkedom')

class setAsset {

  constructor() {
    this.src = this.argv('src')
    this.minified = this.argv('minified')
    this.nonMinified = this.argv('non-minified')
  }

  run() {
    console.log('Processing...')
    console.time('Done')
    this.getFiles().forEach(file => {
      fs.readFile(resolve(this.src, file), (err, content) => {
        const { document } = parseHTML(content.toString())
        document.querySelectorAll('link[href]').map(i => {
          this.minified ? this.setMinified(i, 'href') : this.setNonMinified(i, 'href')
        })
        document.querySelectorAll('script[src]').map(i => {
          this.minified ? this.setMinified(i, 'src') : this.setNonMinified(i, 'src')
        })
        fs.writeFile(resolve(this.src, file), '<!DOCTYPE html>\n' + document.documentElement.outerHTML, err => err && console.log(err))
      })
    })
    console.timeEnd('Done')
  }

  argv(key) {
    const arg = process.argv.filter(val => val.startsWith('--' + key))
    return arg.length ? arg.pop().split('=').pop() : null
  }

  getFiles() {
    let files = []
    fs.readdirSync(this.src).map(file => file.endsWith('.html') && files.push(file))
    return files
  }

  setNonMinified(el, attr) {
    const src = el.getAttribute(attr)
    switch (attr) {
      case 'href':
        src.endsWith('.min.css') && el.setAttribute(attr, src.slice(0, -7) + 'css')
        break;
      case 'src':
        src.endsWith('.min.js') && el.setAttribute(attr, src.slice(0, -6) + 'js')
        break;
    }
  }

  setMinified(el, attr) {
    this.setNonMinified(el, attr)
    const src = el.getAttribute(attr)
    switch (attr) {
      case 'href':
        src.endsWith('.css') && el.setAttribute(attr, src.slice(0, -3) + 'min.css')
        break;
      case 'src':
        src.endsWith('.js') && el.setAttribute(attr, src.slice(0, -2) + 'min.js')
        break;
    }
  }

}

new setAsset().run()