const { sassPlugin } = require('esbuild-sass-plugin');
const inlineImage = require("esbuild-plugin-inline-image");
const args = process.argv.slice(2);
const isHeroku = true;//process.env.NODE_ENV === 'production';

const buildOptions = {
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
};

// For production build (e.g., on Heroku)
if (isHeroku) {
  require("esbuild").build(buildOptions)
    .then(() => {
      console.log("⚡ Production build complete");
    })
    .catch(() => process.exit(1));
} else {
  // For development, with watch mode
  require("esbuild").context(buildOptions)
    .then((context) => {
      if (args.includes('--watch')) {
        context.watch();
        console.log('⚡ Watching for changes...');
      } else {
        context.rebuild();
        console.log('⚡ Development build complete');
      }
    })
    .catch(() => process.exit(1));
}
