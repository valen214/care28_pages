
import fs from "fs";
import path from "path";

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import svelte_preprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";


// use cross-env to set
const production = process.env.NODE_ENV === "production"; // !process.env.ROLLUP_WATCH;

const genConfig = ({
  name,
  input,
  plugins,
}) => {
  return {
    input,
    output: {
      sourcemap: true,
      format: 'es',
      name: input || "app",
      dir: 'public/pages'
    },
    plugins: [
      svelte({
        dev: !production,
        css: name && (css => {
          css.write(name + ".css");
        }),
        preprocess: svelte_preprocess(),
      }),
      typescript(),
      commonjs(),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      production && terser(), // minify
      ...(plugins || []),
    ],
  };
}

function copyIndex(){
  fs.mkdirSync("public/", { recursive: true });
  fs.copyFileSync("src/index.html", "public/index.html");
}


const configs = fs.readdirSync(
  path.join(__dirname, "src/pages"), {
  withFileTypes: true
}).filter(dirent => dirent.isFile() && 
    dirent.name.toString().endsWith(".svelte")
).map((dirent, i) => {
  let first = i === 0;
  let filename = dirent.name.toString();
  let basename = filename.match(/\/?([^/]+)\.svelte$/)[1];
  console.assert(path.basename(filename) === filename,
      `filename(${filename}) not equals to path.basename()`, path.basename(filename));
  return genConfig({
    name: basename,
    input: "src/pages/" + filename,
    plugins: first && [
      {
        name: 'watch-external',
        buildStart(){
          this.addWatchFile(path.resolve(__dirname, 'src/index.html'));
          copyIndex();
        },
        watchChange(){
          console.log("index.html modified, copying...");
          copyIndex();
        }
      }
    ]
  });
});


export default configs;

