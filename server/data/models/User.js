'use strict';

let mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    userRoles = ['user', 'admin'],
    forbiddenCharacters = [' ', '<', '>', '(', ')', ','];

module.exports.init = function () {
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
                    let containsForbiddenChars = forbiddenCharacters.some(
                        function (item) {
                            return val.includes(item);
                        }
                    );

                    return !containsForbiddenChars;
                },
                message: 'Username should not contain invalid characters!'
            }
        },
        firstName: {
            type: String,
            validate: {
                validator: function (val) {
                    'use strict';
                    let containsForbiddenChars = forbiddenCharacters.some(
                        function (item) {
                            return val.includes(item);
                        }
                    );

                    return !containsForbiddenChars;
                },
                message: 'Name should not contain invalid characters!'
            }
        },
        lastName: {
            type: String,
            validate: {
                validator: function (val) {
                    'use strict';
                    let containsForbiddenChars = forbiddenCharacters.some(
                        function (item) {
                            return val.includes(item);
                        }
                    );

                    return !containsForbiddenChars;
                },
                message: 'Username should not contain invalid characters!'
            }
        },
        email: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        hashPass: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 16,
            max: 155
        },
        role: {
            type: String,
            default: 'user',
            required: true,
            validate: {
                validator: function (val) {
                    'use strict';
                    return userRoles.some(function (item) {
                        return (item === val);
                    });
                },
                message: 'Invalid user role!'
            }
        }
    });

    userSchema.methods = {
        authenticate: function (password) {
            return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        },
        update: function (newProps) {
            for (let prop in newProps) {
                this[`${prop}`] = newProps[`${prop}`];
            }

            this.save();
            return this;
        }
    };

    var User = mongoose.model('User', userSchema);
};


