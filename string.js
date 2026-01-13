function removeChars(str1, str2) {
  var result = "";
  for (var i = 0; i < str1.length; i++) {
    if (str2.indexOf(str1[i]) === -1) {
      result += str1[i];
    }
  }
  return result;
}


// "aaabbc" → "a3b2c1"





