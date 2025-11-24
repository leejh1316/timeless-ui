import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import { Button } from "@timeless-ui/ui";
import { useEffect, useLayoutEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/kdual", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer: "https://kpu.kdual.net/",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
  });
  const handleGetMainPage = async () => {
    try {
      const res = await fetch("/kdual", {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "Access-Control-Allow-Credentials": "true",
        },
        referrer: "https://kpu.kdual.net/",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      const text = await res.text();
      if (res.ok) {
        console.log(res);
        // 서버가 HTML을 반환하므로 필요에 따라 처리하세요
        alert("요청 성공");
        console.log(text);
      } else {
        alert(`요청 실패: ${res.status}`);
        console.error(text);
      }
    } catch (err) {
      alert("네트워크 오류");
      console.error(err);
    }
  };
  return (
    <div className="min-h-dvh bg-gray-50">
      {/* <Header /> */}
      <Outlet />
      <Button onClick={handleGetMainPage}>메인페이지 겟</Button>
      <LoginOnPocess />
    </div>
  );
}

export default App;
export function LoginOnPocess() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    // Ensure required keys exist
    const params = new URLSearchParams();
    params.set("login_type", (fd.get("login_type") as string) || "");
    params.set("userid", (fd.get("userid") as string) || "");
    params.set("password", (fd.get("password") as string) || "");
    params.set("UserType", (fd.get("UserType") as string) || "");

    try {
      const res = await fetch("/kdual/Account/LogOnProcess", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        referrer: "https://kpu.kdual.net/",
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "content-type": "application/x-www-form-urlencoded",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          "upgrade-insecure-requests": "1",
        },
        body: params.toString(),
      });

      const text = await res.text();
      if (res.ok) {
        // 서버가 HTML을 반환하므로 필요에 따라 처리하세요
        alert("요청 성공");
        console.log(text);
      } else {
        alert(`요청 실패: ${res.status}`);
        console.error(text);
      }
    } catch (err) {
      alert("네트워크 오류");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="max-w-md space-y-3 p-4">
      <input type="hidden" name="login_type" value="" />
      <div>
        <label className="block text-sm">아이디 (이메일)</label>
        <input name="userid" type="email" required className="w-full" />
      </div>
      <div>
        <label className="block text-sm">비밀번호</label>
        <input name="password" type="password" required className="w-full" />
      </div>
      <div>
        <label className="block text-sm">유저타입</label>
        <input name="UserType" type="text" className="w-full" />
      </div>
      <div>
        <button type="submit" className="bg-blue-600 px-4 py-2 text-white">
          로그인
        </button>
      </div>
    </form>
  );
}
