const assert = require('assert');
const fs = require('fs');
const ConfigManager = require('../index');

const configFilePath = "./test/test.json";

const requiredConfigs1 = [
    { "key": "config1", "caption": "What should be the value for config1? " },
    { "key": "some_other_config", "caption": "And what about some other config? " }
];

function sendInput(input) {
    process.nextTick(function() {
        stdin.send(input);
        console.log('Sent');
    });
}

describe('# Config Manager', function() {
    describe('## Initialization', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof ConfigManager);
        });

        it('should return an object with function getConfiguration()', function() {
            assert.equal('function', typeof ConfigManager().getConfiguration);
        });
    });

    describe('## getConfiguration()', function() {
        afterEach(function() {
            if (fs.existsSync(configFilePath)) {
                fs.unlinkSync(configFilePath);
            }
        });

        it('should return an object', function() {
            assert.equal('object', typeof ConfigManager(configFilePath, []).getConfiguration());
        });

        it('should return an object with all the required configuration keys and values', function() {
            assert.deepEqual(requiredConfigs1.map(function(item) { return item.key }),
                Object.keys(
                    ConfigManager(configFilePath, requiredConfigs1).getConfiguration()
                    )
                );
        });
    });
});
