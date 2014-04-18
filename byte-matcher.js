module.exports = byteMatcher

function byteMatcher(buffer, target, midMatchIndex, firstOnly) {
  // ensure value to match is buffer
  if (!Buffer.isBuffer(target)) target = new Buffer(String(target))

  var indexArray = []
    , matchLength = target.length
    , bufferLength = buffer.length
    , startIndex = -1
    , bufferCursor = 0
    , matchCursor = midMatchIndex || 0
    , match = null

	firstOnly = !!firstOnly

  for (bufferCursor = 0; bufferCursor < bufferLength; bufferCursor ++) {

    if (buffer[bufferCursor] === target[matchCursor]) {

      if (startIndex === -1) startIndex = bufferCursor

      matchCursor ++

      if (matchCursor === matchLength) {
				match = {}
				if ('number' === typeof midMatchIndex) {
					startIndex -= midMatchIndex
					midMatchIndex = undefined
				} else {
					match.start = startIndex
				}

        match.end = startIndex + matchLength
				if (firstOnly) return match

        indexArray.push(match)

        startIndex = -1
        matchCursor = 0
				match = null
      }

    } else if (matchCursor !== 0) {
      startIndex = -1
      matchCursor = 0
			match = null
    }
  }

	// add boundary match
	if ('number' === typeof midMatchIndex) {
		match = { cursor: matchCursor }
		if (firstOnly) return match
		indexArray.push(match)
	} else if (startIndex !== -1) {
		match = { start: startIndex, cursor: matchCursor }
    if (firstOnly) return match
		indexArray.push(match)
	}
	// add boundary match
	return indexArray
}

