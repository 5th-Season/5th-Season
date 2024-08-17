const {sassPlugin} = require('esbuild-sass-plugin');
var tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./config/tailwind.config.js"),
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require("postcss-nested"),
    require("postcss-flexbugs-fixes"),
    sassPlugin
  ]
}