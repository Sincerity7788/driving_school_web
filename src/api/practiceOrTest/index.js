import request from "@/utils/request.js";

// 获取题库数据
export function getQuestionAPI(params) {
  return request({
    url: "/api/v1/question/getQuestion",
    method: "get",
    params,
  });
}
