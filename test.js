#!/usr/bin/env node
var byteMatcher = require('./byte-matcher')
  , test = require('tap').test

test('should match indices in buffer when match is in the middle of the buffer', function (t) {
  var testBuffer = new Buffer('my test string')
    , target = new Buffer('test')
    , match = byteMatcher(testBuffer, target)[0]

  t.equals(testBuffer.slice(match.start, match.end).toString(), 'test')
  t.end()
})

test('should match at end of buffer and return undefined for end to signify that it is in mid match', function (t) {
  var testBuffer = new Buffer('my string te')
    , target = new Buffer('test')
    , match = byteMatcher(testBuffer, target)[0]

  t.deepEquals(match, { start: 10, cursor: 2 })
  t.end()
})

test('should match end of match if passed a current matchIndex', function (t) {
  var testBufferOne = new Buffer('my string te')
    , testBufferTwo = new Buffer('st is awesome!')
    , target = new Buffer('test')
    , matchOne = byteMatcher(testBufferOne, target)[0]
    , matchTwo = byteMatcher(testBufferTwo, target, matchOne.cursor)[0]

  t.deepEquals(matchOne, { start: 10, cursor: 2 })
  t.deepEquals(matchTwo, { end: 2 })
  t.end()
})

test('should match over more than two buffers', function (t) {
  var testBufferOne = new Buffer('my string te')
    , testBufferTwo = new Buffer('st is ama')
    , testBufferThree = new Buffer('zing stuff')
    , target = new Buffer('test is amazing')
    , matchOne = byteMatcher(testBufferOne, target)[0]
    , matchTwo = byteMatcher(testBufferTwo, target, matchOne.cursor)[0]
    , matchThree = byteMatcher(testBufferThree, target, matchTwo.cursor)[0]

  t.deepEquals(matchOne, {start: 10, cursor: 2})
  t.deepEquals(matchTwo, { cursor: 11 })
  t.deepEquals(matchThree, { end: 4 })

  t.end()
})

test('should start match in first buffer and then not return a new', function (t){
  var testBufferOne = new Buffer('my st')
    , testBufferTwo = new Buffer('opping not matchin example')
    , target = new Buffer('start')
    , matchOne = byteMatcher(testBufferOne, target)[0]
    , matchTwo = byteMatcher(testBufferTwo, target, testBufferOne.cursor)

  t.deepEquals(matchOne, { start: 3, cursor: 2 })
  t.equals(matchTwo.length, 0)

  t.end()
})

test('should make multiple matches over one buffer', function (t) {
  var testBuffer = new Buffer('test test and another test')
    , target = new Buffer('test')
    , matches = byteMatcher(testBuffer, target)

  t.equals(matches.length, 3)
  t.deepEquals(matches, [{ start: 0, end: 4 }, { start: 5, end: 9 }, { start: 22, end: 26 }])
  t.end()
})

test('should return only the first matched if firstOnly === true', function (t) {
  var testBuffer = new Buffer('test test and another test')
    , target = new Buffer('test')
    , matches = byteMatcher(testBuffer, target, null, true);

  t.deepEquals(matches, { start: 0, end: 4 })
  t.end()
})

test('should match over more than two buffers returning single objects if firstOnly === true', function (t) {
  var testBufferOne = new Buffer('my string te')
    , testBufferTwo = new Buffer('st is ama')
    , testBufferThree = new Buffer('zing stuff')
    , target = new Buffer('test is amazing')
    , matchOne = byteMatcher(testBufferOne, target, null, true)
    , matchTwo = byteMatcher(testBufferTwo, target, matchOne.cursor, true)
    , matchThree = byteMatcher(testBufferThree, target, matchTwo.cursor, true)

  t.deepEquals(matchOne, {start: 10, cursor: 2})
  t.deepEquals(matchTwo, { cursor: 11 })
  t.deepEquals(matchThree, { end: 4 })

  t.end()
})
