import request from "@/utils/request.js";

// 获取题库总数
export function getQuestionTotalAPI(params) {
  return request({ url: "/api/v1/question/getTotal", method: "get", params });
}
