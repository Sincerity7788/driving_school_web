import request from "@/utils/request.js";

// 获取题库数据
export function getQuestionAPI(params) {
  return request({
    url: "/api/v1/question/getQuestion",
    method: "get",
    params,
  });
}

// 提交当前题答案
export function addHistoryQuestionAPI(data) {
  return request({
    url: "/api/v1/historyQuestion/add",
    method: "post",
    data,
  });
}

// 获取模拟考试题
export function getQuestionIndexDataAPI(params) {
  return request({
    url: "/api/v1/quesRen/getQuestionIndexData",
    method: "get",
    params,
  });
}
