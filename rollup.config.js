
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import svelte_preprocess from "svelte-preprocess";
import multiInput from 'rollup-plugin-multi-input';

// use cross-env to set
const production = process.env.NODE_ENV === "production"; // !process.env.ROLLUP_WATCH;


export default {
	input: [
    'src/pages/*.svelte'
  ],
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		dir: 'public'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => {
				css.write('bundle.css');
      },
      preprocess: svelte_preprocess(),
    }),
    commonjs(),
		resolve({
			browser: true,
			dedupe: ['svelte']
    }),
    multiInput({
      transformOutputPath(output, input){
        return output;
      }
    }),
		production && terser() // minify
	],
	watch: {
		clearScreen: false
	}
};