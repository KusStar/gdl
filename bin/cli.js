#!/usr/bin/env node
'use strict'

const meow = require('meow')
const { downloadWithCheck } = require('../dist')

const cli = meow(
  `
  Usage
      $ gdl url dir [options]

  Options
      --help

  Examples
      $ gdl --help
      $ gdl https://github.com/KusStar/gdl ./gdl
  `,
)

if (cli.input.length > 0) {
  const [url, dir] = cli.input
  downloadWithCheck(url, dir)
} else {
  cli.showHelp()
}