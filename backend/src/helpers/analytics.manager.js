const { promisify } = require('util');
const RedisCon = require('../connections/redisCon');
const client = new RedisCon().client;
const _ = require('lodash');


const smembers = promisify(client.smembers).bind(client);
const hgetall = promisify(client.hgetall).bind(client);
const zincrby = promisify(client.zincrby).bind(client);
const get = promisify(client.get).bind(client);
const zrevrange = promisify(client.zrevrange).bind(client);

class AnalyticsManager {
    constructor() { }

}


module.exports = new AnalyticsManager();