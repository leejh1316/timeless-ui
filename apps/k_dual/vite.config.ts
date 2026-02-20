import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { execSync } from "child_process";
let commitHash;
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn("Could not get commit hash");
  commitHash = "unknown";
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const OUT_DIR = "./dist";
  const apiBaseUrl = "/kdual";
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@const": path.resolve(__dirname, "./src/const"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@models": path.resolve(__dirname, "./src/models"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@router": path.resolve(__dirname, "./src/router"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    build: {
      outDir: OUT_DIR,
    },
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
      __API_BASE_URL__: JSON.stringify(apiBaseUrl),
    },
    server: {
      host: true,
      port: 3050,
      proxy: {
        "/kdual": {
          target: "https://kpu.kdual.net",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/kdual/, ""),
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, _req, _res) => {
              proxyReq.setHeader(
                "Accept",
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              );
              proxyReq.setHeader("Origin", "https://kpu.kdual.net");
              proxyReq.setHeader("Referer", "https://kpu.kdual.net/");
            });
            // 리다이렉트의 location 헤더를 수정해서 vite proxy를 타도록 수정
            // 리다이렉트시 응답에 location : http://kpu.kdual.net/Mypage.... 이런식으로 오는데
            // 이걸 강제로 localhost/kdual/Mypage... 이런식으로 바꿔주는 작업 -> /kdual로 시작하는 요청은 프록시를 타도록 되어있음
            proxy.on("proxyRes", (proxyRes, _req, _res) => {
              const location = proxyRes.headers["location"];
              if (location) {
                const targetDomain = "http://kpu.kdual.net";
                if (location.startsWith(targetDomain)) {
                  proxyRes.headers["location"] = location.replace(targetDomain, "/kdual");
                }
              }
            });
          },
        },
      },
    },
  };
});
