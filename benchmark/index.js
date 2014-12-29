#!/usr/bin/env node
var Suite = require('benchmark').Suite
var byteMatcher = require('../')
var b0_1_0 = require('../old/0.1.0')
var suite = new Suite()

var haystack = new Buffer('askjdaskjdnashellosamhowareyouhellosamhowareyoualksndkasndlkasnd')
var needle = new Buffer('hellosamhowareyouhellosamhowareyou')

console.log(b0_1_0(haystack, needle))
console.log(byteMatcher(haystack, needle))

suite
  .add('Old naive matcher', function () {
    b0_1_0(haystack, needle)
  })
  .add('New Matcher', function () {
    byteMatcher(haystack, needle)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'))
  })
  .run({ 'async': true })
