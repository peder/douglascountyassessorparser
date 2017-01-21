var humps = require("humps");

var getParcelHtml = require("./getParcelHtml.js");
var parseValuationsFromHtml = require("./parseValuationsFromHtml.js");
var flattenValuations = require("./flattenValuations.js");
var parseImprovementInformationFromHtml = require("./parseImprovementInformationFromHtml.js");
var convertToCsv = require("./convertToCsv.js");

var homes = require("./homes.json");
var env = require("./env.json");

var homesPromises = homes.slice(0, 3).map(camelizeHomeKeys).map(getParcelHtml);

Promise.all(homesPromises)
    .then(parseValuationsFromHtml)
    .then(flattenValuations)
    .then(parseImprovementInformationFromHtml)
    // .then(flattenImprovementInformation)
    .then(convertToCsv)
    .then(function(homesCsv) { console.log(homesCsv); console.log("done!"); });





function camelizeHomeKeys(home) {
    return humps.camelizeKeys(home);
}