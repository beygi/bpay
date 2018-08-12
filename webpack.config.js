const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require("webpack");
const path = require("path");

// variables
const isProduction = process.argv.indexOf("-p") >= 0;
const sourcePath = path.join(__dirname, "./src");
const outPath = path.join(__dirname, "./dist");

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// set env
new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
})

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: sourcePath,
    devServer: {
        contentBase: sourcePath,
        hot: true,
        disableHostCheck: true,
        stats: {
            warnings: false,
        },
    },
    entry: {
        main: ["babel-polyfill", "./index.tsx"],
        vendor: [
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "redux",
        ],
    },
    module: {
        loaders: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? "ts-loader?module=es6"
                    : [
                        "react-hot-loader/webpack",
                        "ts-loader",
                    ],
            },
            // static assets
            {test: /\.html$/, use: "html-loader"},
            {test: /\.png$/, use: "url-loader?limit=10000"},
            {test: /\.jpg$/, use: "file-loader"},
            {test: /\.(eot|ttf|woff|woff2)$/, loader: "file-loader"}
        ],
        rules: [
            {
                test:
                    /\.po$/,
                loader: 'i18next-po-loader'
            },
            {
                enforce: "pre",
                loader: "tslint-loader",
                test: /\.tsx?$/,
                exclude : path.resolve(__dirname, 'src/lib/api'),
		options: {
			configFile: "tslint.json",
			emitErrors: true,
		}

            },
            {
                loader: "react-hot-loader/webpack!ts-loader",
                test: /\.tsx?$/,
            },
            {test: /\.svg$/, use: "file-loader"},
            // {
            //   test: /\.svg$/,
            //   loader: 'svg-inline-loader'
            // },
            {test: /\.(eot|ttf|woff|woff2)$/, loader: "file-loader"},
            {
                test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                              fallback: 'style-loader',
                              use: ['css-loader',

                              {
        loader: require.resolve("postcss-loader"),
        options: {
            ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
            plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                    browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9", // React doesn"t support IE8 anyway
                    ],
                    flexbox: "no-2009",
                }),
            ],
        },
    }, 'less-loader'
                           ]
                            }),
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]',
            },
        ],
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: "empty",
        net: "empty",
    },
    output: {
        filename: "bundle.js",
        path: outPath,
        publicPath: "/",
    },
    plugins: [
        //new UglifyJsPlugin({
        //    test: /\.js($|\?)/i,
        //    sourceMap: isProduction,
        //    uglifyOptions: {
        //        compress: true
        //    }
        //}),
        new webpack.optimize.CommonsChunkPlugin({
            filename: "vendor.bundle.js",
            minChunks: Infinity,
            name: "vendor",
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: "styles.optimize.css",
            disable: !isProduction
        }),
        new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorOptions: { discardComments: { removeAll: true } },
              canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
        //new CopyWebpackPlugin([
        //            { from: sourcePath+'/assets/images/SVG/*.svg', to: outPath+"/images/svg/" , flatten : true }
        //        ]),
        ],
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        // Fix webpack"s default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ["main"],
    },
    target: "web",
    devServer: {
        contentBase: './dist'
    },
};
