const Configly = require('configly-js')

const configly = Configly.instance ?? Configly.init(process.env.CONFIGLY_PUBLIC)

export default configly
