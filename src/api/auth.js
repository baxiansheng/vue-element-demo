import request from "@/utils/request";

export function login(data = {username: '', password: ''}) {
  return request({
    url: "/api/login",
    method: "post",
    data: data,
  });
}