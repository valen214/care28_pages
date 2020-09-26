import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import html from '@rollup/plugin-html';
import multi from '@rollup/plugin-multi-entry';
import multiInput from 'rollup-plugin-multi-input';

import path from "path";

const production = process.env.NODE_ENV === "production"; // !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev', '-s'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

let index = 0;
let genConfig = ({
  name = "app",
  input = 'src/main.ts'
} = {}) => {
  ++index;
  return {
    input,
    output: {
      sourcemap: !production,
      chunkFileNames: "[name].js",
      format: 'esm',
      // name,
      // file: `public/build/bundle.js`,
      dir: "public/",
    },
    plugins: [
      {
          name: 'watch-external',
          buildStart(){
              this.addWatchFile(path.resolve(__dirname, 'src/index.html'))
          }
      },
      {
          name: 'rename-index',
          writeBundle(options, bundle){
          }
      },
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css: css => {
          css.write('bundle.css');
        },
        preprocess: sveltePreprocess(),
        customElement: true
      }),
  
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production
      }),
      // html(),
      // multi(),
  
      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),
  
      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload('public'),
  
      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
      multiInput({
      }),
      htmlTemplate({
        template: 'src/index.html',
        target: 'index.html',
        attrs: [ "type='module'" ]
      }),
    ],
  };
}

export default [
  genConfig({
    name: "app",
    input: [
      'src/pages/**/*.svelte',
      "src/App.svelte",
      'src/main.ts',
    ]
  }),
  genConfig({
    name: "register-page",
    input: "src/pages/Register.svelte"
  })
][1];
