import Mock from "mockjs";

/**
 * 请求类型
 */
export enum RType {
  GET = "get",
  POST = "post",
}

/**
 * 状态码
 */
export enum HttpCode {
  SUCCESS = 200,
  AUTH_ERROR = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const baseURL = import.meta.env.VITE_API_BASEURL;

function formateRurl(rurl: string | RegExp) {
  if (typeof rurl === "string") {
    rurl = baseURL + rurl;
  } else {
    // 如果是正则表达式，则直接拼接
    const source = rurl.source;
    const flag = rurl.flags;
    rurl = new RegExp(baseURL + source, flag);
  }
  return rurl;
}

/**
 * 在mock.ts中定义成功请求的规则
 * @param rurl string: 请求地址
 * @param rtype string: 请求类型
 * @param rtemplate Object | () => Object: 请求模板
 */
export function mockSuccessWrapper(
  rurl: string | RegExp,
  rtype: string,
  rtemplate: Object | Function | undefined
) {
  rurl = formateRurl(rurl);
  Mock.mock(rurl, rtype, () => {
    const data = Mock.mock(rtemplate);
    return {
      code: HttpCode.SUCCESS,
      message: "请求成功",
      data,
    };
  });
}


/**
 * 在mock.ts中定失败请求的规则
 * @param rurl string: 请求地址
 * @param rtype string: 请求类型
 * @param rtemplate Object | () => Object: 请求模板
 * @param code HttpCode: 请求状态码
 * @param message string: 请求失败message
 */export function mockFailWrapper(
  rurl: string | RegExp,
  rtype: string,
  rtemplate: Object | Function | undefined,
  code: HttpCode,
  message: string = '服务器错误'
) {
  rurl = formateRurl(rurl);
  Mock.mock(rurl, rtype, () => {
    const data = Mock.mock(rtemplate);
    return {
      code,
      message,
      data,
    };
  });
}
export function mockRequest() {
  console.log("start mock request");
  const mockModules = import.meta.glob("../views/**/*mock.ts");
  // 导入模块并使用
  Object.keys(mockModules).forEach((key) => {
    const module = mockModules[key];
    module();
  })
}


// const data = Mock.mock({
//   "list|1-10": [
//     {
//       "id|+1": 1, // 从 1 开始，每次加 1
//       name: "@cname", // 随机中文名字
//       "age|18-60": 1, // 18 到 60 岁之间的整数
//       "gender|1": ["男", "女"], // 男或女
//       email: "@email", // 随机电子邮件地址
//     },
//   ],
// });
// console.log(data);
