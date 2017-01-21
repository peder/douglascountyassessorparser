var humps = require('humps');

var flattenImprovements = function(homes) {
    console.log("in flattenImprovements");

    homes.map(function(home) {
        //console.log(home.valuations);

        Object.keys(home.improvements)
            .forEach(function(improvementKey) {
                //console.log(improvementKey);
                //home[valuation.year + ]

                home.home[improvementKey] = home.improvements[improvementKey];
            });

        return home;
    });

    return new Promise(function(resolve, reject) {
        resolve(homes);
    });
}

module.exports = flattenImprovements;