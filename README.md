# Byte-matcher

A simple module/function for finding binary matches in buffers. This function takes a buffer and a target buffer (or string converted to buffer) to match within the first buffer.
Once all the bytes in the buffer have been interated an array of objects is returned containing
a start index, end and/or a cursor value.

Install:
```
$ (sudo) npm install byte-matcher
```

Usage:
```javascript
var byteMatcher = require('byte-matcher')
	, bufferToSearch = new Buffer('to find the thing')
	, bufferToMatch = new Buffer('target to match')

var matches = byteMatcher(buffertoSearch, bufferToMatch [, startingBufferIndex])
```

The following attributes will **only** be present in the object if they have been established.

```javascript
matches[0].start {number|undefined}
matches[0].end {number|undefined}
matches[0].cursor {number|undefined}
```

**At this point I must point out the end value is actually the next index after the last index of that match - there is a good reason for this**
Say that you would like to slice a buffer:

```javascript
var b = new Buffer('hello world!')
// in order to get 'hello'
// you must slice with the end index at the next byte
var hello = b.slice(0, 5)
console.log(hello.toString()) // === 'hello' even tho
console.log(new Buffer([hello[4]]).toString()) // === 'o'
```

so if you want the actual last index matched byte you will need to do `matches[0].end - 1`.

So if a match has been found and fully matched then it will have a start and an end. If a match has begun and the buffer has run out (suggesting the match could be split over multiple buffers) then the last match object in the array will have a start index and cursor signifying the next index of the target buffer, is intended to be used to check in a subsequent buffer.

The third argument will take a starting index (or cursor value) which the matching buffer can continue from.

This will yield a match with no start index value, and either an end index if the match is complete or a cursor value for the next buffer match to continue from.

This makes it particularly easy for juggling matches over a buffer boundaries because we will know that we have have started the match in this buffer if the match object has a startIndex and that the match is either complete with an end index or in progress with a cursor value.

If we have a match at the end of one buffer and then it is not fulfilled in a continuation it is safe to say that this was never matched.

Managing these indices is a little tricky but give a lot of power, this is intented to have other more user friendly modules built on top of it, such as binary matching streams.


