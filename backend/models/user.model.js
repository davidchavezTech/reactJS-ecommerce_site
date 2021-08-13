const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    names: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

// // **********************Create user manually*********************

// const username = {
//     username: "david",
//     password: "12341234",
//     nombres: "David Chavez"
// }

// const newUser = new User(username);

// newUser.save()
// .then(() => console.log('Yes'))
// .catch(err => console.log('Error: ' + err));


module.exports = User