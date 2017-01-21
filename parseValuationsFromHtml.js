var cheerio = require("cheerio");
var tabletojson = require('tabletojson');
var humps = require('humps');

var parseValuationsFromHtml = function(homes) {
    console.log("in parseValuationsFromHtml");

    homes.map(function(home) {
        let $ = cheerio.load(home.parcelHtml);

        //console.log($.html());

        var valuationsTable = $("b:contains('Value Information')").parents("table");

        //console.log(valuationsTable.html());

        valuationsTable.find("thead tr").eq(0).remove();
        valuationsTable.find("thead tr th").eq(0).text("Year");
        var valuationsHtml = valuationsTable.clone().wrap("<table>").parent().html();

        //console.log(valuationsHtml;

        home.valuations = humps.camelizeKeys(tabletojson.convert(valuationsHtml)[0]);

        return home;
    });

    return new Promise(function(resolve, reject) {
        resolve(homes);
    });
}

module.exports = parseValuationsFromHtml;