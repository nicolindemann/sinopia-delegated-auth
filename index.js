var request = require('request')

module.exports = DelegatedAuthentication

function DelegatedAuthentication(config, stuff) {
  var self = Object.create(DelegatedAuthentication.prototype)

  // config for this module
  self._config = config

  var url = self._config.url
  if (!url) throw new Error('should specify "url" in config')

  return self
}

DelegatedAuthentication.prototype.authenticate = function (user, password, cb) {
  var self = this
  request.get(self._config.url,
    {
      auth: {
        user: user,
        password: password,
        sendImmediately: true
      },
      gzip: true,
      timeout: 1500
    },
    function (error, response) {
      if (error || response.statusCode != 200) {
        return cb(null, false)
      } else {
        return cb(null, [user])
      }
    }
  )
}
