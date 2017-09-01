# user-config-manager

[![npm version](https://badge.fury.io/js/user-config-manager.svg)](https://badge.fury.io/js/user-config-manager)
[![npm downloads](https://img.shields.io/npm/dt/user-config-manager.svg)](https://www.npmjs.com/package/user-config-manager)

[![NPM](https://nodei.co/npm/user-config-manager.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/user-config-manager/)

[![Build Status](https://travis-ci.org/tfKamran/user-config-manager.svg?branch=master)](https://travis-ci.org/tfKamran/user-config-manager)

It is a node module to help with persistent user configurations in a node console application.

## Why to use?

If you are working on a console application that needs to save certain user preferences, you need not worry about managing it by yourself! Just add this module to your application and it will take care of prompting the user and persisting the response across application sessions!

## How to get?

    npm install user-config-manager

## How to use?

You can fetch the user configurations without having to care about where it is saved already or being prompted to the user with this simple code snippet:

    const path = require('path');
    const ConfigManager = require('user-config-manager');
    const configurations = ConfigManager(
            path.join(require('os').homedir(), '/.my-app-configs.json'), // Configuration file path
            [
                {
                    "key": "some_key",
                    "caption": "What would you like to have? "
                },
                {
                    "key": "some_other_key",
                    "caption": "And for the desert? "
                }
            ]
        );

    configurations.getConfiguration(); // => Asks user for preferences

    configurations.getConfiguration(); // => Uses configuration from the file

This will synchronously return an object containing key value pair like:

    configurations: {
        "some_key": "Some User Response",
        "some_other_key": "Some Other Response"
    }

When invoked the first time, it will prompt the user with captions and store the user responses with the respective keys in the provided configuration file. Once the configurations are saved, it will pick up the saved configurations and there will be no prompts to the user for the keys already stored for any successive invokations to `getConfiguration()`.
