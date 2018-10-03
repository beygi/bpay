// shared config (dev and prod)
const {
    resolve
} = require('path');
const {
    CheckerPlugin
} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isProduction = process.argv.indexOf("-p") >= 0;

//color overrides

const tinycolor = require("tinycolor2");
const paletteHigh = "#665f62"  ;
const paletteLow =  "#d9d8da" ;
const paletteCrazy = "#f03829" ;
const paletteAlternate = "#645045";
const paletteAlternate2 = "#5498a9" ; 
const paletteLight = "#ffffff";


module.exports = {

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        plugins: ['react-hot-loader/babel', ["import", {
                            "libraryName": "antd",
                            "style": true, // or 'css'
                        }]],
                        presets: ['@babel/preset-react'],
                    }
                }, 'awesome-typescript-loader'],
            },
            {
                test: /\.(le|c)ss$/,
                use: [!isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
			    modifyVars: {
				    'primary-color'          :  paletteAlternate2,
				    'processing-color'       : paletteAlternate2,
				    'btn-primary-bg'         : paletteAlternate,
				    'btn-default-color'      : paletteAlternate,
				    'radio-dot-color'        :  paletteHigh,
				    'label-color'                 : paletteLight,
				    'collapse-header-bg':             paletteLow,
				    'radio-button-bg'           :   tinycolor(paletteLow).darken(20).toString(),
				    'radio-button-active-color' :  tinycolor(paletteHigh).darken(40).toString(),

				    'input-border-color'          :  paletteHigh,
				    'input-bg'                    :   tinycolor(paletteLow).darken(20).toString(),
				    'input-addon-bg'              :   tinycolor(paletteLow).darken(20).toString(),
				    'popover-bg':  tinycolor(paletteHigh).darken(20).toString(),
				    'popover-color': tinycolor(paletteLight).darken(15).toString(),
				},
                        }
                    }
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader"
            },
            {
                test: /\.po$/,
                loader: 'i18next-po-loader'
            }
        ],
    },
    output: {
        publicPath: "/"
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[chunkhash].min.css",
        })
    ],
    performance: {
        hints: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // async + async chunks
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                },
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};
