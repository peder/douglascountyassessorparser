var request = require("request");
var sprintf = require("sprintf-js").sprintf;

var env = require("./env.json");

var getParcelHtml = function(home) {
    console.log("in getParcelHtml for " + home.parcelId);
    var homeUrl = sprintf(env.parcelUrlFormat, home);

    return new Promise(function(resolve, reject) {
        request(homeUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve({
                    home: home,
                    parcelHtml: body
                });
                return;
            }

            reject(error);
        });
    });
}

module.exports = getParcelHtml;