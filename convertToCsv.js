var json2csv = require("json2csv");

var convertToCsv = function(homes) {
    console.log("in convertToCsv");

    var homesOnly = homes.map(function(home) { return home.home; });
    var homesCsv = json2csv({data: homesOnly});

    return new Promise(function(resolve, reject) {
        resolve(homesCsv);
    });
}

module.exports = convertToCsv;