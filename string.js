function firstNonRepeat(str) {
  for (var i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  return null;
}

// "aaabbc" → "a3b2c1"





