import request from "@/utils/request";

export function getUsers(content = "") {
  return request({
    url: "/api/users",
    method: "get",
  });
}
