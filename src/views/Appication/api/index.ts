import request from "@/utils/axios";

export const API: Record<string, string> = {
  getTestInfo1: "/test/getTestInfo1",
  getTestInfo2: "/test/getTestInfo2",
};

export interface TestInfo {
  id: number;
  name: string;
}

// 获取测试信息1
export const getTestInfo1 = () => {
  return request.get<TestInfo>(API.getTestInfo1);
};

// 获取测试信息2
export const getTestInfo2 = () => {
  return request.post<TestInfo>(API.getTestInfo2);
};
