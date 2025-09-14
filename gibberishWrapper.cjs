const gibberish = require("gibberish-detective")({ useCache: false });
gibberish.set("useCache", true)

function gibberishWrapper(text) {
  return gibberish.detect(text)
}

module.exports = {
  gibberishWrapper
}
