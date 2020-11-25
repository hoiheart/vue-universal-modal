import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'

const options = {
  input: 'src/index.ts',
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

export default [
  // esm
  {
    ...options,
    output: {
      file: 'dist/index.js',
      format: 'esm'
    }
  },
  // es5 build
  {
    ...options,
    output: {
      file: 'dist/index.es5.js',
      format: 'esm'
    },
    plugins: [
      ...options.plugins,
      [
        babel({
          presets: [
            [
              '@babel/preset-env', {
                targets: {
                  ie: '11'
                }
              }
            ]
          ]
        })
      ]
    ]
  },
  // runtime build
  {
    ...options,
    input: 'src/index.runtime.ts',
    output: {
      file: 'dist/index.runtime.js',
      format: 'umd',
      esModule: false,
      globals: {
        vue: 'Vue'
      },
      name: 'VueUniversalModal',
      exports: 'default'
    },
    plugins: [
      ...options.plugins,
      [
        babel({
          babelHelpers: 'runtime',
          presets: [
            [
              '@babel/preset-env', {
                targets: {
                  ie: '11'
                }
              }
            ]
          ]
        })
      ]
    ]
  }
]
