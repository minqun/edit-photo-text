/*
 * @Author: your name
 * @Date: 2022-04-20 09:32:29
 * @LastEditTime: 2022-04-28 13:53:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fabric-photo/webpack.config.js
 */
const { resolve } = require('path');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        index: ['./demo/index.js']
    },
    output: {
        library: "default", // string,
        libraryTarget: "umd", // 通用模块定义
        filename: '[name].js',
        path: resolve(__dirname, 'web'),
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          modules: false,
                          useBuiltIns: 'usage',
                          corejs: {
                            version: 3,
                            proposals: true,
                          },
                        },
                      ],
                      '@babel/preset-react',
                    ],
                    plugins: [
                      ['@babel/plugin-proposal-decorators', { legacy: true }],
                      ['@babel/plugin-proposal-class-properties'],
                    //   [
                    //     'babel-plugin-import',
                    //     {
                    //       libraryName: 'antd',
                    //       libraryDirectory: 'es',
                    //       style: true,
                    //     },
                    //   ],
                    ],
                  },
                },
              },
           
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    // externals: {
    //     jquery: 'jQuery',
    //     lodash: '_'
    // },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
