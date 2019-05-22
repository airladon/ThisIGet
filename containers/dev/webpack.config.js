const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line import/no-unresolved
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line import/no-unresolved
const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-unresolved
const Autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const entryPoints = require('./getLessons.js');
const createLessonIndex = require('./createIndex.js');
const setFilesForBuild = require('./setFilesForBuild.js');

const buildPath = path.resolve(__dirname, 'app', 'app', 'static', 'dist');

const envConfig = {
  prod: {
    name: 'production',
    shortName: 'prod',
    uglify: true,
    webpackMode: 'production',
    devtool: false,
    uglifySourceMap: false,
    reactDevMode: false,
  },
  stage: {
    name: 'stage',
    shortName: 'stage',
    uglify: true,
    webpackMode: 'production',
    devtool: 'source-map',
    uglifySourceMap: true,
    reactDevMode: false,
  },
  dev: {
    name: 'development',
    shortName: 'dev',
    uglify: false,
    webpackMode: 'development',
    devtool: 'source-map',
    uglifySourceMap: false,
    reactDevMode: true,
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
  entryPoints.updateDetailsAndVersions();
  // eslint-disable-next-line no-console
  console.log('Create Lesson Index');
  createLessonIndex(e.name, './src/Lessons');
  // eslint-disable-next-line no-console
  console.log('Set Files for Build');
  setFilesForBuild.setBaseHTML(e.shortName);

  console.log(`Building for ${e.name}`); // eslint-disable-line no-console

  let uglify = '';

  if (e.uglify) {
    uglify = new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        // parse: { ...options },
        // compress: { ...options },
        // mangle: {
        //   ...options,
        //   properties: {
        //     // mangle property options
        //   },
        // },
        output: {
          comments: false,
          beautify: false,
          // ...options
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
      sourceMap: e.uglifySourceMap,
    });
  }
  const clean = new CleanWebpackPlugin([buildPath]);

  let define = '';
  if (envConfig.reactDevMode) {
    define = new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    });
  }

  const extract = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
  });
  // const extract = new ExtractTextPlugin({
  //   filename: '[name].css',
  //   allChunks: true,
  // });

  const copy = new CopyWebpackPlugin(
    [
      {
        from: '/opt/app/src/Lessons/*/*/topic.png',
        to: '/opt/app/app/app/static/dist/[1][name].[ext]',
        test: /\/opt\/app\/src\/(.*)topic\.png$/,
      },
      // {
      //   from: '/opt/app/src/Lessons/Math/Geometry_1/topic.png',
      //   to: '/opt/app/app/app/static/dist/Lessons/Math/Geometry_1/topic.png',
      //   // test: /\/opt\/app\/src\/(.*)topic\.png$/,
      // },
    ],
    // { debug: 'debug' },
  );

  let cssMini = '';
  if (e.uglify) {
    cssMini = new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    });
  }
  // Make the plugin array filtering out those plugins that are null
  const pluginArray = [
    uglify,
    define,
    extract,
    copy,
    clean,
    cssMini].filter(elem => elem !== '');

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
  return {
    entry: entryPoints.entryPoints(e.name),
    output: {
      path: buildPath,
      filename: '[name].js',
    },

    // Delete from here after fixing diagram integration
    resolve: {
      symlinks: false,
      extensions: ['.js'],
      modules: [
        'node_modules',
        path.resolve(__dirname + '/src'),
      ],
      alias: {
        ['~']: path.resolve(__dirname + '/src'),
      },

    },
    // Delete to here
    externals,
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
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [Autoprefixer],
                sourceMap: envConfig.uglifySourceMap,
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
              loader: path.resolve('/opt/app/math-loader.js'),
            },
            {
              loader: 'markdown-loader',
            }
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                publicPath: '/static/dist/',
                context: '/opt/app/src',
              },
            },
          ],
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
        minSize: 3000,
        cacheGroups: {
          default: {
            minChunks: 2000,
            priority: -20,
            reuseExistingChunk: true,
          },
          tools: {
            minSize: 10,
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
            test: /js\/(diagram|Lesson|tools|components)/,
            name: 'tools',
          },
          commonlessons: {
            minSize: 10,
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true,
            test: /Lessons\/LessonsCommon/,
            name: 'commonlessons',
          },
          // lessonindex: {
          //   minSize: 10,
          //   minChunks: 2,
          //   priority: 0,
          //   reuseExistingChunk: true,
          //   test: /Lessons\/index.js/,
          //   name: 'lessonindex',
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
