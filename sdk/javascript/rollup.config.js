/*
 * @Author: Whzcorcd
 * @Date: 2020-11-20 11:25:50
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-23 15:08:12
 * @Description: file content
 */
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'sdk',
      file: 'dist/sdk.js',
      format: 'iife',
      exports: 'auto',
    },
    {
      name: 'sdk',
      file: 'dist/sdk.min.js',
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
    {
      name: 'sdk',
      file: 'dist/sdk.umd.js',
      format: 'umd',
      exports: 'auto',
    },
  ],
  plugins: [typescript()],
}
