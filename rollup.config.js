/*
 * @Author: your name
 * @Date: 2022-04-20 09:32:29
 * @LastEditTime: 2022-04-20 16:49:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fabric-photo/rollup.config.js
 */
const { join } = require('path');
const babel = require('rollup-plugin-babel');
const alias = require('rollup-plugin-alias');

const cwd = __dirname;

const baseConfig = {
    input: join(cwd, 'src/index.js'),
    // external: ['react', 'react-dom', 'jquery'],
    output: [
        {
            file: join(cwd, 'dist/index.js'),
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    ],
    plugins: [
        alias({
            entries: [
                // {
                //     find: 'fabric',
                //     replacement: join(cwd, 'node_modules/fabric/dist/fabric.js')
                // }
            ]
        }),
        babel()
    ]
};
const esmConfig = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        sourcemap: true,
        format: 'es',
        file: join(cwd, 'dist/index.esm.js')
    }
};

function rollup() {
    const target = process.env.TARGET;
    if (target === 'umd') {
        return baseConfig;
    }
    if (target === 'esm') {
        return esmConfig;
    }
    return [baseConfig, esmConfig];
}
module.exports = rollup();
