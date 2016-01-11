'use strict';

let mongoose = require('mongoose'),
    transmissionTypes = ['manual', 'automatic'],
    forbiddenCharacters = [' ', '<', '>', '(', ')', ','],
    validateString = function(field){
        return {
            validator: function (val) {
                'use strict';
                let containsForbiddenChars = forbiddenCharacters.some(
                    function(item){
                        return val.includes(item);
                    }
                );

                return !containsForbiddenChars;
            },
            message: field + ' should not contain invalid characters!'
        }
    };


module.exports.init = function () {
    let carSchema = mongoose.Schema({
        make: {
            type: String,
            required: true,
            minlength: 1,
            validate: validateString('Make')
        },
        model: {
            type: String,
            required: true,
            minlength: 1,
            validate: validateString('Model')
        },
        yearOfProduction: {
            type: Number,
            min: 1900,
            max: 2100,
            required: true
        },
        transmission: {
            type: String,
            validate: {
                validator: function (val) {
                    return transmissionTypes.some(function (item) {
                        return (item === val);
                    });
                },
                message: 'Invalid transmission type!'
            }
        },
        fuel: {
            type: String,
            required: true

        },
        mileage: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        imagesUrl: {
            type: String
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        power: {
            type: Number
        },
        price: {
            type: Number,
            required: true
        },
        dateOfCreation: {
            type: Date,
            required: true
        },
        phone: {
            type: String
        },
        email: {
            type: String,
            required: true
        }
    });


    let Car = mongoose.model('Car', carSchema);
};