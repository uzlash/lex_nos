const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
})

UserSchema.pre('save', function (next) {
    let me = this;
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(me.password, salt, (err, encrypted) => {
        if (err) {
            console.log("Password encryption Error", err);
        } else {
            me.password = encrypted;
            next();
        }
    });
});

module.exports = mongoose.model('User', UserSchema);