
var async = require('async');      // 非同步控制 

exports.testasync = (req, res, next) => {
    async.waterfall([
        (callback) => {
            (async () => {

                const getValue = await testPromise(req, res);
                callback(null, getValue);

            })()
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                callback(err, null); //return callback(true, err); 
            });
        },
        (getValue, callback) => {

            callback(null, getValue);
        }
    ], (err, getValue) => {
        if (err) {
            console.log("err:")
            console.log(err)
            throw err;//return next(err);
        }

        return res.json(getValue);

    });

}

var testPromise = function (req, res) {

    return new Promise(function (resolve, reject) {

        console.log("hi:")
        resolve({name:"test"})
        //reject()
    });

};