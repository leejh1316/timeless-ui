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

    // 2. 헤더 설정
    proxy.on("proxyReq", (proxyReq, req, res) => {
      proxyReq.setHeader("Origin", "https://kpu.kdual.net");
      proxyReq.setHeader("Referer", "https://kpu.kdual.net/");
    });

    // 3. 쿠키 설정 (도메인 제거)
    proxy.on("proxyRes", (proxyRes, req, res) => {
      const sc = proxyRes.headers["set-cookie"];
      if (Array.isArray(sc)) {
        proxyRes.headers["set-cookie"] = sc.map((cookie) => {
          return cookie.replace(/Domain=[^;]+;?/gi, "");
        });
      }
    });

    // 4. 에러 핸들링
    proxy.on("error", (err, req, res) => {
      console.error("Proxy Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Proxy Error", details: err.message });
      }
      resolve(); // 에러 발생 시에도 Promise 종료
    });

    // 5. 요청 전달
    proxy.web(req, res, undefined, (e) => {
      // proxy.web 자체 콜백에서도 에러 처리 및 종료
      resolve();
    });
  });
}
