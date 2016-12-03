import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import ENV from '../config';

const userSchema = mongoose.Schema({
    'email': {
        type: String,
        required: [true, 'Email is required'],
        index: true,
        unique: true
    },

    'password': {
        type: String,
        required: [true, 'Password is required']
    },

    created_at: Date,
    updated_at: Date
});

userSchema.plugin(mongooseUniqueValidator, {message: 'The email address already on use'});

userSchema.pre('save', function (next) {

    const user = this;

    let currentDate = new Date();

    user.updated_at = currentDate;

    if (!user.created_at)
        user.created_at = currentDate;


    if (user.isModified('password')) {

        bcrypt.genSalt(ENV.SALT_WORK_FACTOR, function (err, salt) {

            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {


                if (err) return next(err);

                user.password = hash;

                next();

            });
        });

    }
    else {
        next();
    }

});

userSchema.methods.checkPassword = function(userInputPassword, cb) {
    bcrypt.compare(userInputPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('users', userSchema);

export default User;