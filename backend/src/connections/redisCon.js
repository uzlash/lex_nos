/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';

const redis = require('redis');
const { host, port, db, password } = require('../configs').redis;

class RedisCon {
    constructor() {
        const options = {
            host,
            port,
            db
        }
        this.client = redis.createClient(options);
        this.client.on('error', (err) => {
            console.log('Error ' + err);
        });

        this.client.on('ready', () => {
            this.client.AUTH(password, (err, reply) => {
                if (err) {
                    console.log('Error Authenticating user !! , err');
                } else {
                    console.log('Redis user Authenticated !!! ', reply);
                }
            })
            console.log('Connected to REDIS Server....');
        });
    }
}

module.exports = RedisCon;