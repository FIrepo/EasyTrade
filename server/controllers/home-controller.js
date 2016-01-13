"use strict";

module.exports = function (app, carsData, reData) {
    return {
        getLast: function (req, res) {
            let data = {};
            carsData.getLast(10, function (err, cars) {
                if (err) {
                    req.session.error = 'Last cars could not be obtained: ' + err;
                    res.redirect('/');
                    return;
                }
                // console.log(cars);
                data.cars = cars;
                // res.send(cars);
            });

            reData.getLast(10, function (err, re) {
                if (err) {
                    req.session.error = 'Last real estates could not be obtained: ' + err;
                    res.redirect('/');
                    return;
                }
                data.re = re;
            });
            setTimeout(function(){
                res.render('index', {cars: data.cars, re: data.re});
            }, 1000);
        }
    }
};