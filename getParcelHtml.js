var request = require("request");
var sprintf = require("sprintf-js").sprintf;
var throttledRequest = require("throttled-request")(request);

var env = require("./env.json");

throttledRequest.configure({
  requests: 1,
  milliseconds: 1500
});

var getParcelHtml = function(home) {
    console.log("in getParcelHtml for " + home.parcelId);
    var homeUrl = sprintf(env.parcelUrlFormat, home);

    return new Promise(function(resolve, reject) {
        throttledRequest(homeUrl, function (error, response, body) {
            console.log("in getParcelHtml for " + home.parcelId + ": response received");

            if (!error && response.statusCode == 200) {
                resolve({
                    home: home,
                    parcelHtml: body
                });
                return;
            }

            console.log("in getParcelHtml for " + home.parcelId + ": error encountered!" + error);
            reject("in getParcelHtml for " + home.parcelId + ": error encountered!" + error);
        });
    });
}

module.exports = getParcelHtml;