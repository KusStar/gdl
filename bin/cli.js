#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const { downloadWithCheck } = require('../dist')
const updateNotifier = require('update-notifier')
const packageJson = require('../package.json')

updateNotifier({ pkg: packageJson }).notify()

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
