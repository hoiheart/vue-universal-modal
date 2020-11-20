import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm'
      },
      {
        file: 'dist/index.es5.js',
        format: 'esm',
        plugins: [
          getBabelOutputPlugin({
            presets: [
              [
                '@babel/preset-env', {
                  modules: 'umd',
                  targets: {
                    ie: '11'
                  }
                }
              ]
            ]
          })
        ]
      }
    ],
    external: ['vue'],
    plugins: [
      resolve(),
      vue({
        preprocessStyles: true,
        postcssPlugins: [
          autoprefixer()
        ]
      }),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.build.json')
      }),
      css({ output: 'dist/index.css' })
    ]
  }
]
