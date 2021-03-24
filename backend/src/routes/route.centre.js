const express = require('express');

const RedisCon = require('../connections/redisCon');
const CentreDao = require('../dao/dao.centre');

module.exports = (io) => {
    const api = express.Router();

    api.get('/', async (req, res) => {
        try {
            let centres = await CentreDao.getAll();
            res.status(200).json({ status: 'success', payload: centres });
        } catch (err) {
            res.status(500).json({ status: 'failure', err });
        }
    });

    api.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            let centre = await CentreDao.getOne(id);
            res.status(200).json({ status: 'success', payload: centre });
        } catch (err) {
            res.status(500).json({ status: 'failure', payload: null, message: err });
        }
    });

    api.post('/', (req, res) => {
        try {
            let centre = await CentreDao.addNew(req.body);
            res.status(200).json({ status: 'success', payload: centre });
        } catch (err) {
            res.status(500).json({ status: 'failure', payload: null, message: err });
        }
    });

    return api;
};
