#!/usr/bin/env node
'use strict'
const { downloadWithCheck } = require('../dist')

const input = process.argv.slice(2)

if (input.length > 0) {
  const [url, dir] = input
  downloadWithCheck(url, dir)
} else {
  console.log(
    `
  Usage
      $ gdl url dir [options]

  Options
      --help

  Examples
      $ gdl --help
      $ gdl https://github.com/KusStar/gdl ./gdl
  `
  )
}