const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('index.html');
let app = express();

app.use(
    proxy("/api", {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            "^/api": ""
        }
    })
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
