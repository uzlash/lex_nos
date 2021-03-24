const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { secretKey, expiresIn } = require('../configs').webToken;
const UserDao = require('../dao/dao.user');


module.exports = (io) => {
    const api = express.Router();

    api.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            let user = await UserDao.getOneByEmail(email);
            if (user) {
                const { status, message } = UserStatus(user)
                if (status === false) {
                    throw new Error(message)
                }
                else {
                    let dbUserPass = user.password;
                    let flag = await comparePasswordsPromisified(password, dbUserPass);
                    if (flag) {
                        user.password = '************';
                        let token = await generateToken(user._id);
                        const payload = { user: user, token: token };
                        res.status(200).json({ status: 'success', payload: payload, message: 'User Logged In Successfully!' });
                    } else {
                        res.status(500).json({ status: 'failed', payload: null, message: 'Invalid username or password' });
                    }
                }
            }
            else {
                throw new Error('Invalid Username or Password');
            }
        } catch (err) {
            res.status(403).json({ status: 'failed', payload: null, message: err.message });
        }
    });

    api.post('/register', async (req, res) => {
        try {
            const savedUser = await UserDao.addNew(req.body);
            res.status(200).json({ status: 'success', payload: savedUser, message: 'User created successfully!' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err.message });
        }
    });
    return api;
}

function comparePasswordsPromisified(sent, existing) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(sent, existing, (err, same) => {
            if (err) {
                reject(err);
            }
            resolve(same);
        });
    });
}

function generateToken(userId) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign({ userId: userId }, secretKey, { expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

function UserStatus(userObj) {
    if (userObj.status === 'inactive') {
        return { status: false, message: 'Your account has been blocked, please contact an admin!' }
    }
    else {
        return { status: true, message: 'User logged in successfully!' }
    }
}
