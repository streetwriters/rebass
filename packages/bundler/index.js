#!/usr/bin/env node
const execa = require("execa");
const fs = require("fs");

const babel = (env, ...args) => {
  return execa(
    "babel",
    ["--verbose", ...args.filter(Boolean), "--root-mode=upward"],
    {
      stdio: "inherit",
      env: {
        NODE_ENV: env,
      },
    }
  );
};

babel(null, "src", "-d", "dist");
babel("esm", "src", "-o", "dist/index.esm.js");
babel("styled", "src", "-d", "styled-components");

if (fs.existsSync("index.d.ts")) {
  fs.copyFileSync("index.d.ts", "dist/index.d.ts");
}
