const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.register = async function (name, email, password) {
    const userExists = await this.findOne({ email });
    if (userExists) {
        throw new Error('user already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashValue = await bcrypt.hash(password, salt);
    const user = await this.create({
        name,
        email,
        password: hashValue
    });
    return user;
};

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
        return user;
    } else {
        throw new Error('Email or Password incorrect');
    }
};

module.exports = mongoose.model('User', UserSchema);