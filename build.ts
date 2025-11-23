import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

await esbuild.build({
  entryPoints: ["bundle.ts"],
  bundle: true,
  format: "esm",
  outfile: "silverbullet-chart.js",
  sourcemap: false,
  minify: true,
  plugins: [...denoPlugins()],
});

esbuild.stop();