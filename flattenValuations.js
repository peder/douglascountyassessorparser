var humps = require('humps');

var flattenValuations = function(homes) {
    console.log("in flattenValuations");

    homes.map(function(home) {
        //console.log(home.valuations);

        home.valuations
            .filter(function(valuation) { return valuation.year > 2014; })
            .forEach(function(valuation) {
                Object.keys(valuation)
                    .filter(function(valuationKey) { return valuationKey != "year";})
                    .forEach(function(valuationKey) {
                        //console.log(valuationKey);
                        //home[valuation.year + ]

                        //home.home[humps.pascalize(valuationKey) + "Value" + valuation.year] = valuation[valuationKey];

                        home.home[valuationKey + "Value" + valuation.year] = valuation[valuationKey].replace("$", "");
                    });
        });

        return home;
    });

    return new Promise(function(resolve, reject) {
        resolve(homes);
    });
}

module.exports = flattenValuations;