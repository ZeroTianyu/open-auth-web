import axios from "axios";
import { useRouter } from "next/navigation";

// 创建axios实例
const instance = axios.create({
  // 基本请求路径的抽取
  // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
  timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const route = useRouter();
    if (err.response) {
      switch (err.response.status) {
        case 403:
          route.push("/auth/login");
          break;
        default:
          break;
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
