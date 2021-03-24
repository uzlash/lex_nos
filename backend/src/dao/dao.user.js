const UserModel = require('../models/user.model');

class UserDao {
    constructor() { }

    addNew(obj) {
        return new Promise((resolve, reject) => {
            let newUser = new UserModel(obj);
            newUser.save((err, savedUser) => {
                if (err) {
                    reject(err);
                }
                else {
                    savedUser.password = '************';
                    resolve(savedUser);
                }
            });
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, { password: 0 }, (err, singleUser) => { 
                if (err) {
                    reject(err);
                }
                else {
                    resolve(singleUser);
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            UserModel.find({}, { password: 0 }, (err, usersArray) => { 
                if (err) {
                    reject(err);
                }
                else {
                    resolve(usersArray);
                }
            });
        });
    }

    getOneByEmail(email) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email }, (err, singleUser) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(singleUser);
                }
            });
        });
    }

    update(userObj) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(userObj.id, { $set: { 
                    fName: userObj.fName,
                    lName: userObj.lName, 
                    password: userObj.password,
                    phone: userObj.phone,
                    address: userObj.address,
                    userType: userObj.userType,
                    userRole: userObj.userRole,
                    updatedAt: Date.now() 
                    } }, { new: true }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    result.password = '***********';
                    console.log('Update Result', result)
                    resolve(result);
                }
            });
        });
    }

    del(id) {
        return new Promise((resolve, reject) => {
            UserModel.findOneAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('User Deleted Successfully!');
                }
            });
        });
    }
}

module.exports = new UserDao();