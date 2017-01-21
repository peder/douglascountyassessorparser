var cheerio = require("cheerio");
var tabletojson = require('tabletojson');
var humps = require('humps');

var parseSalesInformationFromHtml = function(homes) {
    console.log("in parseSalesInformationFromHtml");

    homes.map(function(home) {
        let $ = cheerio.load(home.parcelHtml);

        home.lastSale = {};

        //console.log($.html());

        var salesTable = $("b:contains('Sales Date')").parents("table");

        //if(salesTable.length > 0) {
        home.lastSale.salesDate = salesTable.find("tr").eq(0).find("td").eq(0).text();
        home.lastSale.salePrice = salesTable.find("tr").eq(2).find("td").eq(0).text();

        home.home.salesDate = home.lastSale.salesDate;
        home.home.salePrice = home.lastSale.salePrice;

        return home;
    });

    return new Promise(function(resolve, reject) {
        resolve(homes);
    });
}

module.exports = parseSalesInformationFromHtml;