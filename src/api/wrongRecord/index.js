import request from "@/utils/request.js";

// 获取列表信息
export function getListAPI(params) {
  return request({
    url: "/api/v1/historyQuestion/getList",
    method: "get",
    params,
  });
}
