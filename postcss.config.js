module.exports = {
    plugins: [
        require('stylelint')({
            extends: ["stylelint-config-standard"],
            rules: {
                "block-closing-brace-empty-line-before": "never",
                "number-leading-zero": "never",
                "color-hex-case": "lower",
                "indentation": 2
            }
        }),
    ]
};

