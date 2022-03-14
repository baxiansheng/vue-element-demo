import request from "@/utils/request";

export function login(data = { name: "", password: "" }) {
  return request({
    url: "/api/login",
    method: "post",
    data: data,
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "get",
  });
}
