'use strict';

let mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

module.exports.init = function() {
    let userSchema = mongoose.Schema({
        username: {
            type: String,
            minlength: 3,
            required: true,
            index: {
                unique: true
            },
            validate: {
                validator: function (val) {
                    'use strict';
                    return !val.includes(' ');
                },
                message: 'Username should not contain empty spaces!'
            }
        },
        salt: String,
        hashPass: String,
        age: {
            type: Number,
            min: 16,
            max: 155
        }
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};


