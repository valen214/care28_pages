
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
      dir: 'public/pages',
      chunkFileNames(chunkInfo){
        return "chunk-[name].js"; // -[hash]
      }
    },
    watch: process.env.ROLLUP_WATCH && {
      buildDelay: 200,
    },
    plugins: [
      svelte({
        dev: !production,
        preprocess: svelte_preprocess(),
      }),
      commonjs({
        sourceMap: false
      }),
      typescript(),
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


const input = fs.readdirSync(
  path.join(__dirname, "src/pages"), {
  withFileTypes: true
}).filter(dirent => {
  if(dirent.isFile()){
    return dirent.name.toString().endsWith(".svelte")
  } else{
    return fs.existsSync(path.join(
      __dirname, "src/pages", dirent.name, "index.svelte"
    ));
  }
}).map((dirent, i) => {
  let first = i === 0;
  let filename, basename;
  if(dirent.isFile()){
    filename = dirent.name;
    basename = filename.match(/\/?([^/]+)\.svelte$/)[1];
  } else {
    filename = dirent.name + "/index.svelte";
    basename = ((s, func) => (
      s.split(/[-_]/g).map(func).join("")
    ))(dirent.name, (s) => (
      s.charAt(0).toUpperCase() + s.slice(1)
    ));
  }
  return [ basename, filename ];
}).reduce((l, [ basename, filename ]) => {
  l[basename] = "./src/pages/" + filename;
  return l;
}, {});



export default genConfig({
  name: "care28_pages",
  input,
  plugins: [
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

