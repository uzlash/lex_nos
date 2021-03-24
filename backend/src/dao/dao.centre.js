const CenterModel = require('../models/centre.model');


class CentreDao {
    constructor() { }

    addNew(obj) {
        return new Promise((resolve, reject) => {
            let newCentre = new CenterModel(obj);
            newCentre.save((err, saved) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(saved);
                }
            });
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            CenterModel.findById(id, async (err, single) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(single);
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            CenterModel.find({}, (err, all) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(all);
                }
            });
        });
    }


    del(id) {
        return new Promise((resolve, reject) => {
            CenterModel.findOneAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('Centre Deleted Successfully!');
                }
            });
        });
    }
}


module.exports = new CenterDao();