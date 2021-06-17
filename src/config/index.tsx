import { login_post, register_post, resisterSms_post, registerVerify_post } from "./urls";
/**
 * 图片前缀URL
 */
export const IMG_BASEURL: string = '';

/**
 * app 接口路径
 */
export const APPPATH = '' && 'DIAMOND'
/**
 * 线上环境
 */
export const ONLINEHOST: string = "https://api.diamond2221.com";
// export const ONLINEHOST: string = "http://60.205.211.107:7001";

/**
 * 测试环境
 */
// export const QAHOST: string = "http://api.diamond2221.com";
// export const QAHOST: string = "http://192.168.19.1:7001";
export const QAHOST: string = "http://127.0.0.1:7002";

/**
 * 线上mock
 */
export const MOCKHOST: string = "https://www.easy-mock.com";

/**
 * 是否mock
 */
export const ISMOCK: boolean = false;

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST: string = process.env.NODE_ENV === "development" ? QAHOST : ONLINEHOST;
export const FULLPATH: string = `${MAINHOST}/${APPPATH}`

export const ApolloUrl: string = `${FULLPATH}/graphql/query`;

// 上传图片
export const uploadImage: string = `${FULLPATH}/api/commons/uploadImages`

/**
 * 请求的公共参数
 */
interface CommonParams {
    timestamp: number;
}
export const conmomPrams: CommonParams = {
    timestamp: Date.now()
};

/**
 * @description token在本地存储的存储的天数，默认7天
 */
export const cookieExpires: number = 7;

// token 在 localStorage 中存储的 key
export const TOKEN_KEY: string = "token";

// 用户信息 在 localStorage 中存储的 key
export const USERINFO: string = "userinfo";

// 不需要  验证token（携带token）的 请求白名单
export const authWhiteList: string[] = [login_post, register_post, resisterSms_post, registerVerify_post];
