const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
  target: "https://kpu.kdual.net",
  changeOrigin: true,
  autoRewrite: true,
  preserveHeaderKeyCase: true,
});

// Proxy Response Event to handle Cookies
proxy.on("proxyRes", (proxyRes, req, res) => {
  // Remove Domain from Set-Cookie headers to allow browser to set cookies for the Vercel domain
  const sc = proxyRes.headers["set-cookie"];
  if (Array.isArray(sc)) {
    proxyRes.headers["set-cookie"] = sc.map((cookie) => {
      return cookie.replace(/Domain=[^;]+;?/gi, "");
    });
  }
});

// Proxy Error Handling
proxy.on("error", (err, req, res) => {
  console.error("Proxy Error:", err);
  res.status(500).json({ error: "Proxy Error", details: err.message });
});

module.exports = (req, res) => {
  // Reconstruct the path from the query param passed by vercel.json rewrite
  const path = req.query.path;

  // Set the URL for the proxy target (removes /api/proxy prefix logic)
  req.url = "/" + (Array.isArray(path) ? path.join("/") : path || "");

  // Inject required headers
  req.headers["origin"] = "https://kpu.kdual.net";
  req.headers["referer"] = "https://kpu.kdual.net/";

  // Forward the request
  proxy.web(req, res);
};
