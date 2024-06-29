import {
  HttpCode,
  RType,
  mockSuccessWrapper,
  mockFailWrapper,
} from "@/mock/index";
import Mock from "mockjs";
import { API } from "./index";

// 接口返回
import type { TestInfo } from "./index";

mockSuccessWrapper(API.getTestInfo1, RType.GET, () => {
  return Mock.mock({
    id: "@id",
    name: "@cname",
  }) as TestInfo;
});

mockFailWrapper(
  API.getTestInfo2,
  RType.POST,
  () => {
    return { message: "request fail, i am mock data" };
  },
  HttpCode.SERVER_ERROR,
  "服务端错误",
);
