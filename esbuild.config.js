const {sassPlugin} = require('esbuild-sass-plugin');
const inlineImage = require("esbuild-plugin-inline-image");
const args = process.argv.slice(2);

require("esbuild").context({
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
  sourcemap: true,
  publicPath: 'assets',
  // watch: args.includes('--watch'),
})
.then((r) => {
  console.log("⚡ Done")

  r.watch();
  // console.log('watching...');
})
.catch(() => process.exit(1));