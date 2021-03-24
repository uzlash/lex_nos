const express = require('express');
const UserDao = require('../dao/dao.user');

module.exports = (io) => {
    const api = express.Router();

    //Create
    api.post('/', async (req, res) => {
        try {
            const savedUser = await UserDao.addNew(req.body);
            const payload = { user: savedUser };
            res.status(200).json({ status: 'success', payload, message: 'User Created Successfully!' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    api.get('/', async (req, res) => {
        try {
            const usersArray = await UserDao.getAll();
            res.status(200).json({ status: 'success', payload: usersArray, message: 'All Users Fetched Successfully' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    api.get('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                const singleUser = await UserDao.getOne(id);
                res.status(200).json({ status: 'success', payload: singleUser, message: 'Single User Fetched Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid User id to Fetch' });
        }
    });

    //update
    api.put('/:id', async (req, res) => {
        const id = req.params.id;
        const { password, fName, lName } = req.body;
        if (id) {
            try {
                const updatedUser = await UserDao.update(id, password, fName, lName);
                res.status(200).json({ status: 'success', payload: updatedUser, message: 'Single User Updated Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid User id to Update' });
        }
    });

    //delete
    api.delete('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                await UserDao.del(id);
                res.status(200).json({ status: 'success', payload: null, message: 'User Deleted Successfully!' });
            } catch (err) {
                res.status(500).json({ status: 'failed', payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid User id to Delete' });
        }
    });

    return api;
}