import { Button } from "@timeless-ui/ui";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { axios } from "./api/axios";
import Header from "./components/layout/Header";

function App() {
  const handleGetMainPage = async () => {
    try {
      const res = await axios.get("", {
        headers: {
          Accept: "text/html",
        },
      });

      const text = await res.data;
      if (res.status === 200) {
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
    <div className="min-h-dvh w-full bg-gray-50">
      <Header />
      <Outlet />
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
      // const res = await fetch("/kdual/Account/LogOnProcess", {
      //   method: "POST",
      //   mode: "cors",
      //   credentials: "include",
      //   referrer: "https://kpu.kdual.net/",
      //   headers: {
      //     accept:
      //       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      //     "content-type": "application/x-www-form-urlencoded",
      //     "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      //     "cache-control": "max-age=0",
      //     "upgrade-insecure-requests": "1",
      //   },
      //   body: params.toString(),
      // });

      const res = await axios.post("/Account/LogOnProcess", params);

      const text = await res.data;
      if (res.status === 200) {
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
        <input name="UserType" type="text" value={"USRT001"} className="w-full" />
      </div>
      <div>
        <button type="submit" className="bg-blue-600 px-4 py-2 text-white">
          로그인
        </button>
      </div>
    </form>
  );
}
