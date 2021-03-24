const crypto = require('crypto');

const { MONGOHOST, MONGOPORT, MONGOUSER, MONGOPASS, MONGODB } = process.env
const host = MONGOHOST || 'localhost'
const port = MONGOPORT || '27017'
const username = MONGOUSER || 'lexnosuser'
const password = MONGOPASS || 'lexnospass'
const database = MONGODB || 'lexnosdb'

module.exports = {
    webToken: {
        secretKey: generateRandomKey(1024),
        expiresIn: 7200, //1 hour
    },
    redis: {
        host: "redisdb",
        port: 6379,
        db: 0,
        password: 'deFVWYBDY&GGYUHDBGDGHGDHHJSN77848836365yhgdgsfsavvsdgeujfgjfusfjgfs949ejfaf77ehnddydjggi8'
    },
    mongo: {
        host,
        port,
        username,
        password,
        database
    }
}

function generateRandomKey(size) {
    const buf = crypto.pseudoRandomBytes(size);
    return buf.toString('base64');
}