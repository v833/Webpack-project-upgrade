const { ConcatSource } = require("webpack-sources");

class FoooterPlugin {
  constructor(options) {
    console.log("options: ", options);
    this.options = options;
  }

  apply(compiler) {
    // console.log('compiler: ', compiler);
    compiler.hooks.compilation.tap("FoooterPlugin", (compilation) => {
      // console.log('compilation: ', compilation);
      compilation.hooks.processAssets.tap("FoooterPlugin", () => {
        const chunks = compilation.chunks;
        // console.log('chunks: ', chunks);
        for (const chunk of chunks) {
          for (const file of chunk.files) {
            // console.log('file: ', file);
            const comment = `/* ${this.options.message} */`;
            compilation.updateAsset(file, (old) => {
              return new ConcatSource(old, "\n", comment);
            });
          }
        }
      });
    });
  }
}

module.exports = FoooterPlugin;
