/* global module require */

const fs = require('fs');
const readline = require('readline-sync');

module.exports = function (configFile, requiredConfigs) {
    var _self = this;

    _self.configFile = configFile;
    _self.requiredConfigs = requiredConfigs;

    return {
        getConfiguration: function () {
            if (!fs.existsSync(_self.configFile)) {
                fs.writeFileSync(_self.configFile, '{}', 'utf-8');
            }

            const configs = require(_self.configFile);

            requiredConfigs.forEach(function (item) {
                if (!configs[item.key]) {
                    configs[item.key] = readline.question(item.caption, item.options);

                    if (!item.options || !item.options.hideEchoBack) {
                        fs.writeFileSync(_self.configFile, JSON.stringify(configs), 'utf-8');
                    }
                }
            });

            return configs;
        }
    };
};
