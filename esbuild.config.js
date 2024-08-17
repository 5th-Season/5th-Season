const { sassPlugin } = require('esbuild-sass-plugin');
const inlineImage = require("esbuild-plugin-inline-image");
const args = process.argv.slice(2);
const isHeroku = process.env.NODE_ENV === 'production';

require("esbuild").build({
  entryPoints: ["./app/javascript/application.js"],
  outdir: "./app/assets/builds",
  bundle: true,
  sourcemap: true,
  allowOverwrite: true,
  plugins: [
    sassPlugin({
      loadPaths: ['./node_modules']
    }),
    inlineImage({
      extensions: ["jpg", "jpeg", "gif"]
    }),
    inlineImage({
      limit: 2000,
      extensions: ["png"]
    })
  ],
  format: "esm",
  publicPath: 'assets',
  watch: !isHeroku && args.includes('--watch'),
}).then(() => {
  console.log("⚡ Done");
}).catch(() => process.exit(1));
