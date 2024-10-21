// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "/Users/ivankanashchenko/Documents/Project/chrome-ext/react-chrome-extension/utils/plugins";
var { resolve } = path;
var distDir = resolve(__vite_injected_original_dirname, "..", "..", "dist");
var publicDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest(manifest2, config) {
  function makeManifest2(to) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, "manifest.json");
    if (config.contentScriptCssKey) {
      manifest2.content_scripts.forEach((script) => {
        script.css = script.css.map(
          (css) => css.replace("<KEY>", config.contentScriptCssKey)
        );
      });
    }
    fs.writeFileSync(
      manifestPath,
      manifest_parser_default.convertManifestToString(manifest2)
    );
    colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
  }
  return {
    name: "make-manifest",
    buildStart() {
      if (config.isDev) {
        makeManifest2(distDir);
      }
    },
    buildEnd() {
      if (config.isDev) {
        return;
      }
      makeManifest2(publicDir);
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var __vite_injected_original_dirname2 = "/Users/ivankanashchenko/Documents/Project/chrome-ext/react-chrome-extension/utils/plugins";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve(__vite_injected_original_dirname2, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "Auto synchronize with manifest",
  version: "0.0.1",
  description: "Auto synchronize with manifest",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite.git"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:watch": "cross-env __DEV__=true vite build --watch",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (run-p wss build:watch)",
    test: "jest"
  },
  type: "module",
  dependencies: {
    antd: "^5.4.7",
    idb: "^7.1.1",
    react: "18.2.0",
    "react-dom": "18.2.0"
  },
  devDependencies: {
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/chrome": "0.0.224",
    "@types/jest": "29.0.3",
    "@types/node": "18.15.11",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.11",
    "@types/ws": "^8.5.4",
    "@typescript-eslint/eslint-plugin": "5.56.0",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "2.2.0",
    chokidar: "^3.5.3",
    "cross-env": "^7.0.3",
    eslint: "8.36.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.32.2",
    "fs-extra": "11.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.5.0",
    "npm-run-all": "^4.1.5",
    prettier: "2.7.1",
    rollup: "2.79.1",
    sass: "1.55.0",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.2",
    typescript: "4.8.3",
    vite: "3.1.3",
    ws: "8.13.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle<KEY>.chunk.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png"
      ],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_dirname3 = "/Users/ivankanashchenko/Documents/Project/chrome-ext/react-chrome-extension";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir2 = resolve3(__vite_injected_original_dirname3, "public");
var isDev2 = process.env.__DEV__ === "true";
var isProduction = !isDev2;
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    makeManifest(manifest_default, {
      isDev: isDev2,
      contentScriptCssKey: regenerateCacheInvalidationKey()
    }),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir: publicDir2,
  build: {
    outDir,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**", "src/**/*.spec.ts"]
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = dir.split("/").at(-1);
          const name = assetFolder + firstUpperCase(_name);
          if (name === "contentStyle") {
            return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
          }
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
var cacheInvalidationKey = generateKey();
function regenerateCacheInvalidationKey() {
  cacheInvalidationKey = generateKey();
  return cacheInvalidationKey;
}
function generateKey() {
  return `${(Date.now() / 100).toFixed()}`;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG1ha2VNYW5pZmVzdCBmcm9tIFwiLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3RcIjtcbmltcG9ydCBjdXN0b21EeW5hbWljSW1wb3J0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCI7XG5pbXBvcnQgYWRkSG1yIGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvYWRkLWhtclwiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0XCI7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xuY29uc3QgaXNQcm9kdWN0aW9uID0gIWlzRGV2O1xuXG4vLyBFTkFCTEUgSE1SIElOIEJBQ0tHUk9VTkQgU0NSSVBUXG5jb25zdCBlbmFibGVIbXJJbkJhY2tncm91bmRTY3JpcHQgPSB0cnVlO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1ha2VNYW5pZmVzdChtYW5pZmVzdCwge1xuICAgICAgaXNEZXYsXG4gICAgICBjb250ZW50U2NyaXB0Q3NzS2V5OiByZWdlbmVyYXRlQ2FjaGVJbnZhbGlkYXRpb25LZXkoKSxcbiAgICB9KSxcbiAgICBjdXN0b21EeW5hbWljSW1wb3J0KCksXG4gICAgYWRkSG1yKHsgYmFja2dyb3VuZDogZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0LCB2aWV3OiB0cnVlIH0pLFxuICBdLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIC8qKiBDYW4gc2xvd0Rvd24gYnVpbGQgc3BlZWQuICovXG4gICAgLy8gc291cmNlbWFwOiBpc0RldixcbiAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbixcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogaXNQcm9kdWN0aW9uLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGRldnRvb2xzOiByZXNvbHZlKHBhZ2VzRGlyLCBcImRldnRvb2xzXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c1wiKSxcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShwYWdlc0RpciwgXCJiYWNrZ3JvdW5kXCIsIFwiaW5kZXgudHNcIiksXG4gICAgICAgIGNvbnRlbnRTdHlsZTogcmVzb2x2ZShwYWdlc0RpciwgXCJjb250ZW50XCIsIFwic3R5bGUuc2Nzc1wiKSxcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsIFwicG9wdXBcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsIFwibmV3dGFiXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgIH0sXG4gICAgICB3YXRjaDoge1xuICAgICAgICBpbmNsdWRlOiBbXCJzcmMvKipcIiwgXCJ2aXRlLmNvbmZpZy50c1wiXSxcbiAgICAgICAgZXhjbHVkZTogW1wibm9kZV9tb2R1bGVzLyoqXCIsIFwic3JjLyoqLyouc3BlYy50c1wiXSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3JjL3BhZ2VzL1tuYW1lXS9pbmRleC5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogaXNEZXZcbiAgICAgICAgICA/IFwiYXNzZXRzL2pzL1tuYW1lXS5qc1wiXG4gICAgICAgICAgOiBcImFzc2V0cy9qcy9bbmFtZV0uW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBkaXIsIG5hbWU6IF9uYW1lIH0gPSBwYXRoLnBhcnNlKGFzc2V0SW5mby5uYW1lKTtcbiAgICAgICAgICBjb25zdCBhc3NldEZvbGRlciA9IGRpci5zcGxpdChcIi9cIikuYXQoLTEpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBhc3NldEZvbGRlciArIGZpcnN0VXBwZXJDYXNlKF9uYW1lKTtcbiAgICAgICAgICBpZiAobmFtZSA9PT0gXCJjb250ZW50U3R5bGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvY3NzL2NvbnRlbnRTdHlsZSR7Y2FjaGVJbnZhbGlkYXRpb25LZXl9LmNodW5rLmNzc2A7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tleHRdLyR7bmFtZX0uY2h1bmsuW2V4dF1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGZpcnN0VXBwZXJDYXNlKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGZpcnN0QWxwaGFiZXQgPSBuZXcgUmVnRXhwKC8oIHxeKVthLXpdLywgXCJnXCIpO1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZShmaXJzdEFscGhhYmV0LCAoTCkgPT4gTC50b1VwcGVyQ2FzZSgpKTtcbn1cblxubGV0IGNhY2hlSW52YWxpZGF0aW9uS2V5OiBzdHJpbmcgPSBnZW5lcmF0ZUtleSgpO1xuZnVuY3Rpb24gcmVnZW5lcmF0ZUNhY2hlSW52YWxpZGF0aW9uS2V5KCkge1xuICBjYWNoZUludmFsaWRhdGlvbktleSA9IGdlbmVyYXRlS2V5KCk7XG4gIHJldHVybiBjYWNoZUludmFsaWRhdGlvbktleTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVLZXkoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAkeyhEYXRlLm5vdygpIC8gMTAwKS50b0ZpeGVkKCl9YDtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGNvbG9yTG9nIGZyb20gXCIuLi9sb2dcIjtcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgTWFuaWZlc3RQYXJzZXIgZnJvbSBcIi4uL21hbmlmZXN0LXBhcnNlclwiO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IGRpc3REaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiLCBcIi4uXCIsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdChcbiAgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMsXG4gIGNvbmZpZzogeyBpc0RldjogYm9vbGVhbjsgY29udGVudFNjcmlwdENzc0tleT86IHN0cmluZyB9XG4pOiBQbHVnaW5PcHRpb24ge1xuICBmdW5jdGlvbiBtYWtlTWFuaWZlc3QodG86IHN0cmluZykge1xuICAgIGlmICghZnMuZXhpc3RzU3luYyh0bykpIHtcbiAgICAgIGZzLm1rZGlyU3luYyh0byk7XG4gICAgfVxuICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUodG8sIFwibWFuaWZlc3QuanNvblwiKTtcblxuICAgIC8vIE5hbWluZyBjaGFuZ2UgZm9yIGNhY2hlIGludmFsaWRhdGlvblxuICAgIGlmIChjb25maWcuY29udGVudFNjcmlwdENzc0tleSkge1xuICAgICAgbWFuaWZlc3QuY29udGVudF9zY3JpcHRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xuICAgICAgICBzY3JpcHQuY3NzID0gc2NyaXB0LmNzcy5tYXAoKGNzcykgPT5cbiAgICAgICAgICBjc3MucmVwbGFjZShcIjxLRVk+XCIsIGNvbmZpZy5jb250ZW50U2NyaXB0Q3NzS2V5KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgIG1hbmlmZXN0UGF0aCxcbiAgICAgIE1hbmlmZXN0UGFyc2VyLmNvbnZlcnRNYW5pZmVzdFRvU3RyaW5nKG1hbmlmZXN0KVxuICAgICk7XG5cbiAgICBjb2xvckxvZyhgTWFuaWZlc3QgZmlsZSBjb3B5IGNvbXBsZXRlOiAke21hbmlmZXN0UGF0aH1gLCBcInN1Y2Nlc3NcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IFwibWFrZS1tYW5pZmVzdFwiLFxuICAgIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBpZiAoY29uZmlnLmlzRGV2KSB7XG4gICAgICAgIG1ha2VNYW5pZmVzdChkaXN0RGlyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKGNvbmZpZy5pc0Rldikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBtYWtlTWFuaWZlc3QocHVibGljRGlyKTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi91dGlscy9sb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL2xvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gXCJzdWNjZXNzXCIgfCBcImluZm9cIiB8IFwiZXJyb3JcIiB8IFwid2FybmluZ1wiIHwga2V5b2YgdHlwZW9mIENPTE9SUztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XG4gIGxldCBjb2xvcjogc3RyaW5nID0gdHlwZSB8fCBDT0xPUlMuRmdCbGFjaztcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwic3VjY2Vzc1wiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdHcmVlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpbmZvXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnUmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndhcm5pbmdcIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnWWVsbG93O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBjb25zb2xlLmxvZyhjb2xvciwgbWVzc2FnZSk7XG59XG5cbmNvbnN0IENPTE9SUyA9IHtcbiAgUmVzZXQ6IFwiXFx4MWJbMG1cIixcbiAgQnJpZ2h0OiBcIlxceDFiWzFtXCIsXG4gIERpbTogXCJcXHgxYlsybVwiLFxuICBVbmRlcnNjb3JlOiBcIlxceDFiWzRtXCIsXG4gIEJsaW5rOiBcIlxceDFiWzVtXCIsXG4gIFJldmVyc2U6IFwiXFx4MWJbN21cIixcbiAgSGlkZGVuOiBcIlxceDFiWzhtXCIsXG4gIEZnQmxhY2s6IFwiXFx4MWJbMzBtXCIsXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxuICBGZ0dyZWVuOiBcIlxceDFiWzMybVwiLFxuICBGZ1llbGxvdzogXCJcXHgxYlszM21cIixcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxuICBGZ01hZ2VudGE6IFwiXFx4MWJbMzVtXCIsXG4gIEZnQ3lhbjogXCJcXHgxYlszNm1cIixcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcbiAgQmdCbGFjazogXCJcXHgxYls0MG1cIixcbiAgQmdSZWQ6IFwiXFx4MWJbNDFtXCIsXG4gIEJnR3JlZW46IFwiXFx4MWJbNDJtXCIsXG4gIEJnWWVsbG93OiBcIlxceDFiWzQzbVwiLFxuICBCZ0JsdWU6IFwiXFx4MWJbNDRtXCIsXG4gIEJnTWFnZW50YTogXCJcXHgxYls0NW1cIixcbiAgQmdDeWFuOiBcIlxceDFiWzQ2bVwiLFxuICBCZ1doaXRlOiBcIlxceDFiWzQ3bVwiLFxufSBhcyBjb25zdDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL21hbmlmZXN0LXBhcnNlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL21hbmlmZXN0LXBhcnNlci9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7dHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XG5cbmNsYXNzIE1hbmlmZXN0UGFyc2VyIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICBzdGF0aWMgY29udmVydE1hbmlmZXN0VG9TdHJpbmcobWFuaWZlc3Q6IE1hbmlmZXN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmlmZXN0UGFyc2VyO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vdXRpbHMvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2l2YW5rYW5hc2hjaGVua28vRG9jdW1lbnRzL1Byb2plY3QvY2hyb21lLWV4dC9yZWFjdC1jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi91dGlscy9wbHVnaW5zL2N1c3RvbS1keW5hbWljLWltcG9ydC50c1wiO2ltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN1c3RvbUR5bmFtaWNJbXBvcnQoKTogUGx1Z2luT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImN1c3RvbS1keW5hbWljLWltcG9ydFwiLFxuICAgIHJlbmRlckR5bmFtaWNJbXBvcnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBgXG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBkeW5hbWljSW1wb3J0ID0gKHBhdGgpID0+IGltcG9ydChwYXRoKTtcbiAgICAgICAgICBkeW5hbWljSW1wb3J0KFxuICAgICAgICAgIGAsXG4gICAgICAgIHJpZ2h0OiBcIil9XCIsXG4gICAgICB9O1xuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vdXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi91dGlscy9wbHVnaW5zL2FkZC1obXIudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XG5cbmNvbnN0IERVTU1ZX0NPREUgPSBgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKXt9O2A7XG5cbmZ1bmN0aW9uIGdldEluamVjdGlvbkNvZGUoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiByZWFkRmlsZVN5bmMoXG4gICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiLCBcInJlbG9hZFwiLCBcImluamVjdGlvbnNcIiwgZmlsZU5hbWUpLFxuICAgIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH1cbiAgKTtcbn1cblxudHlwZSBDb25maWcgPSB7XG4gIGJhY2tncm91bmQ/OiBib29sZWFuO1xuICB2aWV3PzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZEhtcihjb25maWc/OiBDb25maWcpOiBQbHVnaW5PcHRpb24ge1xuICBjb25zdCB7IGJhY2tncm91bmQgPSBmYWxzZSwgdmlldyA9IHRydWUgfSA9IGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgaWRJbkJhY2tncm91bmRTY3JpcHQgPSBcInZpcnR1YWw6cmVsb2FkLW9uLXVwZGF0ZS1pbi1iYWNrZ3JvdW5kLXNjcmlwdFwiO1xuICBjb25zdCBpZEluVmlldyA9IFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLXZpZXdcIjtcblxuICBjb25zdCBzY3JpcHRIbXJDb2RlID0gaXNEZXYgPyBnZXRJbmplY3Rpb25Db2RlKFwic2NyaXB0LmpzXCIpIDogRFVNTVlfQ09ERTtcbiAgY29uc3Qgdmlld0htckNvZGUgPSBpc0RldiA/IGdldEluamVjdGlvbkNvZGUoXCJ2aWV3LmpzXCIpIDogRFVNTVlfQ09ERTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiYWRkLWhtclwiLFxuICAgIHJlc29sdmVJZChpZCkge1xuICAgICAgaWYgKGlkID09PSBpZEluQmFja2dyb3VuZFNjcmlwdCB8fCBpZCA9PT0gaWRJblZpZXcpIHtcbiAgICAgICAgcmV0dXJuIGdldFJlc29sdmVkSWQoaWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZChpZCkge1xuICAgICAgaWYgKGlkID09PSBnZXRSZXNvbHZlZElkKGlkSW5CYWNrZ3JvdW5kU2NyaXB0KSkge1xuICAgICAgICByZXR1cm4gYmFja2dyb3VuZCA/IHNjcmlwdEhtckNvZGUgOiBEVU1NWV9DT0RFO1xuICAgICAgfVxuXG4gICAgICBpZiAoaWQgPT09IGdldFJlc29sdmVkSWQoaWRJblZpZXcpKSB7XG4gICAgICAgIHJldHVybiB2aWV3ID8gdmlld0htckNvZGUgOiBEVU1NWV9DT0RFO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFJlc29sdmVkSWQoaWQ6IHN0cmluZykge1xuICByZXR1cm4gXCJcXDBcIiArIGlkO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pdmFua2FuYXNoY2hlbmtvL0RvY3VtZW50cy9Qcm9qZWN0L2Nocm9tZS1leHQvcmVhY3QtY2hyb21lLWV4dGVuc2lvbi9tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaXZhbmthbmFzaGNoZW5rby9Eb2N1bWVudHMvUHJvamVjdC9jaHJvbWUtZXh0L3JlYWN0LWNocm9tZS1leHRlbnNpb24vbWFuaWZlc3QudHNcIjtpbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbi8qKlxuICogQWZ0ZXIgY2hhbmdpbmcsIHBsZWFzZSByZWxvYWQgdGhlIGV4dGVuc2lvbiBhdCBgY2hyb21lOi8vZXh0ZW5zaW9uc2BcbiAqL1xuY29uc3QgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzXCIsXG4gICAgdHlwZTogXCJtb2R1bGVcIixcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxuICAgIGRlZmF1bHRfaWNvbjogXCJpY29uLTM0LnBuZ1wiLFxuICB9LFxuICAvLyBjaHJvbWVfdXJsX292ZXJyaWRlczoge1xuICAvLyAgIG5ld3RhYjogXCJzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWxcIixcbiAgLy8gfSxcbiAgaWNvbnM6IHtcbiAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwOi8vKi8qXCIsIFwiaHR0cHM6Ly8qLypcIiwgXCI8YWxsX3VybHM+XCJdLFxuICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxuICAgICAgLy8gS0VZIGZvciBjYWNoZSBpbnZhbGlkYXRpb25cbiAgICAgIGNzczogW1wiYXNzZXRzL2Nzcy9jb250ZW50U3R5bGU8S0VZPi5jaHVuay5jc3NcIl0sXG4gICAgfSxcbiAgXSxcbiAgZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgXCJhc3NldHMvanMvKi5qc1wiLFxuICAgICAgICBcImFzc2V0cy9jc3MvKi5jc3NcIixcbiAgICAgICAgXCJpY29uLTEyOC5wbmdcIixcbiAgICAgICAgXCJpY29uLTM0LnBuZ1wiLFxuICAgICAgXSxcbiAgICAgIG1hdGNoZXM6IFtcIio6Ly8qLypcIl0sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtWixTQUFTLG9CQUFvQjtBQUNoYixPQUFPLFdBQVc7QUFDbEIsT0FBT0EsU0FBUSxXQUFBQyxnQkFBZTs7O0FDRm1hLFlBQVksUUFBUTtBQUNyZCxZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7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O0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxVQUFVRixTQUFRLFVBQVUsWUFBWSxZQUFZO0FBQUEsUUFDcEQsT0FBT0EsU0FBUSxVQUFVLFNBQVMsWUFBWTtBQUFBLFFBQzlDLFNBQVNBLFNBQVEsVUFBVSxXQUFXLFVBQVU7QUFBQSxRQUNoRCxZQUFZQSxTQUFRLFVBQVUsY0FBYyxVQUFVO0FBQUEsUUFDdEQsY0FBY0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLFFBQ3ZELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxRQUFRQSxTQUFRLFVBQVUsVUFBVSxZQUFZO0FBQUEsUUFDaEQsU0FBU0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsVUFBVSxnQkFBZ0I7QUFBQSxRQUNwQyxTQUFTLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLE1BQ2pEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0JHLFNBQ1osd0JBQ0E7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsZ0JBQU0sRUFBRSxLQUFLLE1BQU0sTUFBTSxJQUFJQyxNQUFLLE1BQU0sVUFBVSxJQUFJO0FBQ3RELGdCQUFNLGNBQWMsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEMsZ0JBQU0sT0FBTyxjQUFjLGVBQWUsS0FBSztBQUMvQyxjQUFJLFNBQVMsZ0JBQWdCO0FBQzNCLG1CQUFPLDBCQUEwQjtBQUFBLFVBQ25DO0FBQ0EsaUJBQU8sZ0JBQWdCO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsU0FBUyxlQUFlLEtBQWE7QUFDbkMsUUFBTSxnQkFBZ0IsSUFBSSxPQUFPLGNBQWMsR0FBRztBQUNsRCxTQUFPLElBQUksWUFBWSxFQUFFLFFBQVEsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFDeEU7QUFFQSxJQUFJLHVCQUErQixZQUFZO0FBQy9DLFNBQVMsaUNBQWlDO0FBQ3hDLHlCQUF1QixZQUFZO0FBQ25DLFNBQU87QUFDVDtBQUVBLFNBQVMsY0FBc0I7QUFDN0IsU0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssUUFBUTtBQUN2QzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJyZXNvbHZlIiwgIm1hbmlmZXN0IiwgIm1hbmlmZXN0IiwgIm1ha2VNYW5pZmVzdCIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicHVibGljRGlyIiwgImlzRGV2IiwgInBhdGgiXQp9Cg==
