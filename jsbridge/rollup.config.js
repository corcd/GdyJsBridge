/*
 * @Author: Whzcorcd
 * @Date: 2020-11-20 11:25:50
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 09:52:08
 * @Description: file content
 */
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'jsbridge',
      file: 'dist/jsbridge.js',
      format: 'iife',
      exports: 'auto',
    },
    {
      name: 'jsbridge',
      file: 'dist/jsbridge.min.js',
      format: 'iife',
      plugins: [
        terser({
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
        }),
      ],
    },
  ],
  plugins: [
    external(),
    resolve({
      preferBuiltins: false,
      browser: true,
    }),
    typescript(),
  ],
}
