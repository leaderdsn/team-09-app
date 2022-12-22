import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { ViteDevServer } from "vite";
import { listen } from "listhen";
import { store } from "client/src/store/store";
import sirv from "sirv";

export interface IRenderProps {
  path: string;
  store: any;
}

dotenv.config();

const DEV_ENV = "development";

const getStyleSheets = async () => {
  const assetpath = path.dirname(require.resolve("client/dist/client/assets"));
  const files = await fsp.readdir(assetpath);
  const cssAssets = files.filter((file) => file.endsWith(".css"));
  const allContent: string[] = [];

  for (const asset of cssAssets) {
    const content = await fsp.readFile(path.join(assetpath, asset), "utf-8");
    allContent.push(`<style type="text/css">${content}</style>`);
  }

  return allContent.join("\n");
};

const createServer = async (isDev = process.env.NODE_ENV === DEV_ENV) => {
  const app = express();
  app.use(cors());

  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(
    require.resolve("client/dist/client/index.html")
  );
  const srcPath = path.dirname(require.resolve("client"));
  const ssrClientPath = require.resolve("client/dist/server/entry-server.cjs");
  const stylesheets = getStyleSheets();

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: "custom"
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      sirv("client/dist/client/assets", {
        gzip: true
      })
    );
  }

  app.get("/", (_, res) => {
    res.json("👋 Howdy from the server :)");
  });

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    let template: string;
    let render: (props: IRenderProps) => Promise<string>;

    try {
      if (isDev) {
        template = fs.readFileSync(
          path.resolve(srcPath, "index.html"),
          "utf-8"
        );

        template = await vite!.transformIndexHtml(url, template);

        render = (
          await vite!.ssrLoadModule(path.resolve(srcPath, "entry-server.tsx"))
        ).render;
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, "index.html"),
          "utf-8"
        );
        render = (await import(ssrClientPath)).render;
      }

      const state = store.getState();

      const stateMarkup = `<script>window.__REDUX_STATE__ = ${JSON.stringify(
        state
      )}</script>`;

      const appHtml = await render({ path: url, store });

      const cssAssets = await stylesheets;

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--head-css-->`, cssAssets)
        .replace(`<!--redux-state-->`, stateMarkup);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html").end(html);
    } catch (error) {
      if (isDev) {
        vite!.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  return { app, port, vite };
};

createServer()
  .then(async ({ app, port }) => {
    await listen(app, { port });
  })
  .catch(console.error);
