// apps/client/api/proxy.js
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: "https://kpu.kdual.net",
  changeOrigin: true,
  autoRewrite: true,
  preserveHeaderKeyCase: true,
});

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    req.url = req.url.replace(/^\/api\/proxy/, "").replace(/^\/kdual/, "");

    proxy.on("proxyReq", (proxyReq, req, res) => {
      proxyReq.setHeader("Origin", "https://kpu.kdual.net");
      proxyReq.setHeader("Referer", "https://kpu.kdual.net/");

      proxyReq.setHeader("X-Forwarded-Proto", "https");
    });

    proxy.on("proxyRes", (proxyRes, req, res) => {
      const location = proxyRes.headers["location"];
      if (location) {
        proxyRes.headers["location"] = location.replace(/^http:\/\//i, "https://");

        const sc = proxyRes.headers["set-cookie"];
        if (Array.isArray(sc)) {
          proxyRes.headers["set-cookie"] = sc.map((cookie) => {
            return cookie.replace(/Domain=[^;]+;?/gi, "");
          });
        }
      }
    });

    proxy.on("error", (err, req, res) => {
      console.error("Proxy Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Proxy Error", details: err.message });
      }
      resolve();
    });

    proxy.web(req, res, undefined, (e) => {
      resolve();
    });
  });
}
