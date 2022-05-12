require('dotenv')

const domainsFromEnv = process.env.CORS_DOMAIN || ""
const whitelist = domainsFromEnv.split(",").map(item => item.trim());
  
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

module.exports = {corsOptions}