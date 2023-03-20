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

// 将数据库的数据放在redis中
export function getRandomAPI(params) {
  return request({
    url: "/api/v1/quesRen/getRandom",
    method: "get",
    params,
  });
}

// 将redis中的数据删除
export function deleteRedisQuestionAPI(params) {
  return request({
    url: "api/v1/quesRen/deleteRedisQuestion",
    method: "post",
    params,
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

// 查询指定用户是否收藏该题
export function userHasQuestionAPI(params) {
  return request({
    url: "/api/v1/collect/userHasQuestion",
    method: "get",
    params,
  });
}

// 取消收藏该题
export function deleteUserCollectAPI(params) {
  return request({
    url: "/api/v1/collect/deleteUserCollect",
    method: "get",
    params,
  });
}

// 指定用户收藏该题
export function addCollectAPI(data) {
  return request({
    url: "/api/v1/collect/addCollect",
    method: "post",
    data,
  });
}
