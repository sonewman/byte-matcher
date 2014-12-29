module.exports = byteMatcher

function precompile(target) {
  var l = target.length
  var table = {}

  for (var i = 0, e = l - 1; i < l; i++) {
    if (i === e) {
      if (table[i] === void 0)
        table[target[i]] = l
    } else {
      table[target[i]] = l - i - 1
    }
  }
  
  return table
}

function byteMatcher(buffer, target, midMatchIndex, firstOnly) {
  // ensure value to match is buffer
  if (!Buffer.isBuffer(target)) target = new Buffer(String(target))

  var indexArray = []
  var tl = target.length
  var bl = buffer.length
  var targetLast = tl - 1
  var lastFullMatch = bl - tl
//  var r = bl % tl
  var table = precompile(target)
  var match

  for (var i = 0; i <= lastFullMatch;) {
    
    for (var j = tl - 1; j >= 0; j--) {
      if (buffer[i + j] !== target[j]) break
    }

    if (j < 0) {
      match = {
        start: i, 
        end: i + tl
      }
      indexArray.push(match)
      i += tl
    } else {
      i += table[buffer[i + targetLast]] || tl
    }
  }

  // add boundary match
//  if ('number' === typeof midMatchIndex) {
//    match = { cursor: matchCursor }
//    if (firstOnly) return match
//    indexArray.push(match)
//  } else if (startIndex !== -1) {
//    match = { start: startIndex, cursor: matchCursor }
//    if (firstOnly) return match
//    indexArray.push(match)
//  }
  // add boundary match
  return indexArray
}


//  firstOnly = !!firstOnly
  
//  var i = tl - 1
//  var j
//  while (i < bl) {
//    
//    j = 0
//    if (t[j] === buffer[i]) {
//
//      while (++j < tl) {
//        if (t[j] === buffer[i - j]) {
//          if (j === tl) {
//            match = new Match(i - j, i)
//
//            // TODO first
//            indexArray.push(match)
//          }
//        } else {
//          break
//        }
//      }
//    } else {
//      if (table[buffer[i]] > )
//    }
//    
//  }

  
//  for (var i = 0; i < delta; i++) {
//    bc = (i * tl) - 1
//
//    for (tc = 0; tc < tl; tc++) {
//      if (t[tc] === buffer[bc - tc]) {
//        
//      } else {
//        break
//      }
//    }
      
//    } else if (a[v]) {
//    
//    }
    

//  var indexArray = []
//    , matchLength = target.length
//    , bufferLength = buffer.length
//    , startIndex = -1
//    , bufferCursor = 0
//    , matchCursor = midMatchIndex || 0
//    , match = null
//
//  firstOnly = !!firstOnly
//
//  for (bufferCursor = 0; bufferCursor < bufferLength; bufferCursor ++) {
//
//    if (buffer[bufferCursor] === target[matchCursor]) {
//
//      if (startIndex === -1) startIndex = bufferCursor
//
//      matchCursor ++
//
//      if (matchCursor === matchLength) {
//        match = {}
//        if ('number' === typeof midMatchIndex) {
//          startIndex -= midMatchIndex
//          midMatchIndex = undefined
//        } else {
//    s      match.start = startIndex
//        }
//
//        match.end = startIndex + matchLength
//        if (firstOnly) return match
//
//        indexArray.push(match)
//
//        startIndex = -1
//        matchCursor = 0
//        match = null
//      }
//
//    } else if (matchCursor !== 0) {
//      startIndex = -1
//      matchCursor = 0
//      match = null
//    }
//  }
