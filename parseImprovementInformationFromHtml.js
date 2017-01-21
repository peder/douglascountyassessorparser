var cheerio = require("cheerio");
var tabletojson = require('tabletojson');
var humps = require('humps');

var parseImprovementInformationFromHtml = function(homes) {
    console.log("in parseImprovementInformationFromHtml");

    homes.map(function(home) {
        let $ = cheerio.load(home.parcelHtml);

        home.improvements = {};

        //console.log($.html());

        var improvementsTable = $("b:contains('Square Footage')").eq(0).parents("table");

        //console.log(improvementsTable.html());

        improvementsTable.find("tr").each(function() {
            var key1 = $(this).find("td").eq(0).text();
            var value1 = $(this).find("td").eq(1).text();
            var key2 = $(this).find("td").eq(2).text();
            var value2 = $(this).find("td").eq(3).text();

            if(key1)
                home.improvements[humps.camelize(key1.replace(":", ""))] = value1;

            if(key2)
                home.improvements[humps.camelize(key2.replace(":", ""))] = value2;
        });

        //console.log(home.improvements);

        return home;
    });

    return new Promise(function(resolve, reject) {
        resolve(homes);
    });
}

module.exports = parseImprovementInformationFromHtml;