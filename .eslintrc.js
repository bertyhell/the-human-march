module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "node": true
    },
    "globals": {
        "angular": true,
        "_": true,
        "Hammer": true,
        "bowser": true,
        "it": true,
        "describe": true,
        "before": true,
        "after": true
    },
    "extends": "google",
    "rules": {
        "max-len": [1, 500, 4, {
          "ignoreComments": true,
          "ignoreUrls": true
        }],
        "valid-jsdoc": "off",
        "require-jsdoc": "off",
        "no-warning-comments": "off",
        "no-multi-spaces": "off",
        "no-else-return": "off",
        "key-spacing": "off",
        "quote-props": "off",
        "no-negated-condition": "off"
    }
}
