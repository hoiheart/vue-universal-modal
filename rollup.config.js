import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
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
