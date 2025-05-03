const { sassPlugin } = require('esbuild-sass-plugin');
const inlineImage = require("esbuild-plugin-inline-image");
const args = process.argv.slice(2);
const isProduction = process.env.NODE_ENV === 'production';
const watchMode = args.includes('--watch');

const buildOptions = {
  entryPoints: ["./app/javascript/application.js"],
  outdir: "./app/assets/builds",
  bundle: true,
  sourcemap: true,
  allowOverwrite: true,
  loader: { 
    '.woff': 'copy',
    '.ttf': 'copy',
    '.eot': 'copy',
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
    '.gif': 'file' 
  },
  plugins: [
    sassPlugin({
      loadPaths: ['./node_modules']
    }),
    inlineImage({
      extensions: ["jpg", "jpeg", "gif", "svg"]
    }),
    inlineImage({
      limit: 2000,
      extensions: ["png"]
    })
  ],
  format: "esm",
  publicPath: 'assets',
  minify: isProduction
};

if (watchMode) {
  // Development with watch mode
  require("esbuild").context(buildOptions)
    .then(context => {
      context.watch();
      console.log('⚡ Watching for changes...');
    })
    .catch(() => process.exit(1));
} else {
  // One-time build (production or development)
  require("esbuild").build(buildOptions)
    .then(() => {
      console.log(isProduction ? "⚡ Production build complete" : "⚡ Development build complete");
    })
    .catch(() => process.exit(1));
}
