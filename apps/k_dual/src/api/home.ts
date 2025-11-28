import { makeQueryApi } from "@src/hooks/useApiHook";
import { QUERY_KEY } from "./_queryKey";
import { api } from "./axios";

export const home = async () => {
  try {
    const response = await api.get<string>("");
    return response.data;
  } catch (error) {
    throw new Error("Kdaul 홈페이지 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchHome = makeQueryApi(() => home(), {
  queryKey: () => [QUERY_KEY.HOME],
});

// fetch("https://kpu.kdual.net/", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "max-age=0",
//     "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "cross-site",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "https://www.google.com/",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
