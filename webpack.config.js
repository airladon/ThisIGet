const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line import/no-unresolved
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // eslint-disable-line import/no-unresolved
const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-unresolved
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entryPoints = require('./webpack/getContent.js');
const createTopicIndex = require('./webpack/createIndex.js');
// const recordBuildTime = require('./webpack/recordBuildTime.js');
const setFilesForBuild = require('./webpack/setFilesForBuild.js');
const FlaskReloaderPlugin = require('./webpack/flaskReloaderPlugin');

const buildPath = path.join(__dirname, 'app', 'app', 'static', 'dist');

// eslint-disable-next-line no-console
// console.log('Record Build Time');
// const buildTime = recordBuildTime(path.join(__dirname, 'app/app'));
// eslint-disable-next-line no-console
// console.log(buildTime);
const dateString = new Date().toISOString();
const shortDate = dateString.replace(/[-:.TZ]/g, '');

const envConfig = {
  prod: {
    name: 'production',
    shortName: 'prod',
    uglify: true,
    webpackMode: 'production',
    devtool: false,
    uglifySourceMap: false,
    reactDevMode: false,
    outputFilename: `[name]-[chunkhash]-${shortDate}.js`,
    cssFileName: `[name]-[contenthash]-${shortDate}.css`,
  },
  stage: {
    name: 'stage',
    shortName: 'stage',
    uglify: true,
    webpackMode: 'production',
    devtool: 'source-map',
    uglifySourceMap: true,
    reactDevMode: false,
    outputFilename: `[name]-[chunkhash]-${shortDate}.js`,
    cssFileName: `[name]-[contenthash]-${shortDate}.css`,
  },
  dev: {
    name: 'development',
    shortName: 'dev',
    uglify: false,
    webpackMode: 'development',
    devtool: 'source-map',
    uglifySourceMap: false,
    reactDevMode: true,
    outputFilename: '[name]-[contenthash].js',
    cssFileName: '[name]-[contenthash].css',
  },
};

module.exports = (env) => {
  // setup environmnet mode for dev, stage or prod
  let e = envConfig.dev;
  if (env !== undefined) {
    if (env.mode === 'prod') {
      e = envConfig.prod;
    }
    if (env.mode === 'stage') {
      e = envConfig.stage;
    }
    if (env.mode === 'dev') {
      e = envConfig.dev;
    }
  }

  const buildStats = {
    date: dateString,
    shortDate,
    build: e.name,
  };

  // eslint-disable-next-line no-console
  console.log('Record Build Stats');
  fs.writeFileSync(path.join(__dirname, 'app/app/buildTime.json'), JSON.stringify(buildStats, null, 2));
  fs.writeFileSync(path.join(__dirname, 'src/build.json'), JSON.stringify(buildStats, null, 2));
  // const buildTime = recordBuildTime(path.join(__dirname, 'app/app'));
  // eslint-disable-next-line no-console
  console.log(buildStats);

  entryPoints.updateDetailsAndVersions();

  // eslint-disable-next-line no-console
  console.log('Create Lesson Index');
  createTopicIndex(
    e.name,
    path.join(__dirname, 'src/content'),
    path.join(__dirname, 'app/app'),
  );

  // eslint-disable-next-line no-console
  console.log('Set Files for Build');
  setFilesForBuild.setBaseHTML(e.shortName);

  console.log(`Building for ${e.name}`); // eslint-disable-line no-console
  // let uglify = '';

  // if (e.uglify) {
  //   uglify = new UglifyJsPlugin({
  //     uglifyOptions: {
  //       ecma: 8,
  //       warnings: false,
  //       // parse: { ...options },
  //       // compress: { ...options },
  //       // mangle: {
  //       //   ...options,
  //       //   properties: {
  //       //     // mangle property options
  //       //   },
  //       // },
  //       output: {
  //         comments: false,
  //         beautify: false,
  //         // ...options
  //       },
  //       toplevel: false,
  //       nameCache: null,
  //       ie8: false,
  //       keep_classnames: undefined,
  //       keep_fnames: false,
  //       safari10: false,
  //     },
  //     sourceMap: e.uglifySourceMap,
  //   });
  // }
  const clean = new CleanWebpackPlugin();

  let define = '';
  if (envConfig.reactDevMode) {
    define = new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    });
  }

  const extract = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    // filename: '[name].css',
    filename: e.cssFileName,
    chunkFilename: '[id].css',
  });
  // const extract = new ExtractTextPlugin({
  //   filename: '[name].css',
  //   allChunks: true,
  // });

  const copy = new CopyWebpackPlugin({
    patterns: [
      {
        from: 'content/*/*/topic.png',
        to: '/opt/app/app/app/static/dist/',
        context:'/opt/app/src/',
        // transformPath: (targetPath) => {
        //   return `${targetPath.replace('src/', '')}`;
        // },
        globOptions: {
          ignore: ['*boilerplate*'],
        },
      },
      {
        from: 'content/**/*.svg',
        to: '/opt/app/app/app/static/dist/',
        context:'/opt/app/src/',
        // transformPath: (targetPath) => {
        //   return `${targetPath.replace('src/', '')}`;
        // },
        globOptions: {
          ignore: ['*boilerplate*'],
        },
      },
    ],
    // { debug: 'debug' },
  });

  // let cssMini = '';
  // if (e.uglify) {
  //   cssMini = new OptimizeCssAssetsPlugin({
  //     assetNameRegExp: /\.css$/g,
  //     // cssProcessor: require('cssnano'),
  //     cssProcessorPluginOptions: {
  //       preset: ['default', { discardComments: { removeAll: true } }],
  //     },
  //     canPrint: true,
  //   });
  // }

  const flaskReloader = new FlaskReloaderPlugin({});

  // Make the plugin array filtering out those plugins that are null
  const pluginArray = [
    // uglify,
    define,
    extract,
    copy,
    clean,
    // cssMini,
    flaskReloader,
  ].filter(elem => elem !== '');

  let externals = {};
  if (e.shortName === 'prod' || e.shortName === 'stage') {
    externals = {
      react: 'React',
      'react-dom': 'ReactDOM',
      '~/figureone/index': 'Fig',
      'figureone': 'Fig',
    };
  } else if (e.shortName === 'dev') {
    externals = {
      '~/figureone/index': 'Fig',
      'figureone': 'Fig',
    };
  }
  // const p = entryPoints.entryPoints(e.name, 'Math/Trigonometry_1')
  // console.log(Object.keys(p).length)
  // console.log(p)

  return {
    entry: entryPoints.entryPoints(e.name, ''),
    output: {
      path: buildPath,
      filename: e.outputFilename,
      assetModuleFilename: (pathData) => {
        return `${path.dirname(pathData.filename).replace(/^src\//, '')}/[name]-[contenthash][ext]`;
      },
    },

    // Delete from here after fixing diagram integration
    resolve: {
      symlinks: false,
      extensions: ['.js'],
      modules: [
        'node_modules',
        path.join(__dirname, '/src'),
      ],
      alias: {
        ['~']: path.join(__dirname, '/src'),
      },

    },
    // Delete to here
    watchOptions: {
      ignored: /.*__image_snapshots__.*png/,
    },
    externals,
    optimization: {
      minimize: e.uglify,
      minimizer: [
        new TerserPlugin({
          // minify: TerserPlugin.uglifyJsMinify,
          terserOptions: {
            compress: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: envConfig.uglifySourceMap,
                // modules: true,
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer"],
                  sourceMap: envConfig.uglifySourceMap,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: envConfig.uglifySourceMap,
              },
            },
          ],
        },
        {
          test: /\.(md)$/,
          use: [
            'html-loader',
            // 'markdown-loader',
            {
              loader: path.join(__dirname, 'webpack', 'math-loader.js'),
            },
            {
              loader: path.join(__dirname, 'webpack', 'post-markdown-loader.js'),
            },
            {
              loader: 'markdown-loader',
            },
            {
              loader: path.join(__dirname, 'webpack', 'link-loader.js'),
            },
            {
              loader: path.join(__dirname, 'webpack', 'quiz-loader.js'),
            },
          ],
        },
        // {
        //   test: /\.(svg)$/,
        //   use: ['html-loader'],
        // },
        {
          test: /\.(png|jpg|gif|svg|m4a)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: pluginArray,
    mode: e.webpackMode,
    devtool: e.devtool,
    optimization: {
      // SplitChunks docs at https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          // default: {
          //   minChunks: 2,
          //   priority: -20,
          //   reuseExistingChunk: true,
          // },
          default: false,
          tools: {
            minSize: 10,
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
            test: /js\/(diagram|Lesson|tools|components)/,
            name: 'tools',
          },
          commoncontent: {
            minSize: 10,
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true,
            test: /content\/common/,
            name: 'commoncontent',
          },
          topicIndex: {
            minSize: 10,
            minChunks: 1,
            priority: 0,
            reuseExistingChunk: true,
            test: /content\/topicIndex.js/,
            name: 'topicIndex',
          },
          // topicDescription: {
          //   minSize: 10,
          //   minChunks: 1,
          //   priority: 0,
          //   reuseExistingChunk: true,
          //   test: /content\/topicDescription.js/,
          //   name: 'topicDescription',
          // },
          commoncss: {
            minSize: 10,
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
            test: /css\/*\.(css|scss|sass)$/,
            name: 'commoncss',
          },
          // bootstrap: {
          //   test: /css\/bootstrap\*.css/,
          //   name: 'bootstrap',
          //   minChunks: 1,
          //   minSize: 10,
          //   priority: -20,
          // },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendors',
          },
        },
      },
    },
  };
};
