/*
 * @Descripttion: "公共方法"
 * @Author: zhangyu
 * @Date: 2019-07-06 23:11:21
 * @Last Modified by: zhangyu
 * @Last Modified time: 2021-06-17 11:35:08
 */

import { cookieExpires, TOKEN_KEY, USERINFO } from '@/config/index' // cookie保存的天数
import { LoginToken } from "@/types/common"
import { notification } from 'antd';



export const setToken = (token: string) => {
    setStorage<string>(TOKEN_KEY, token, { exp: cookieExpires });
}
export const setUser = (userInfo: { userId: string, token: string }) => {
    setStorage<{ userId: string, token: string }>(USERINFO, userInfo, {
        exp: cookieExpires
    });
}

// export const updateUser = (userInfo) => {
//     setStorage<IUserInfo>(USERINFO, {...getUser()})
// }

export const getUser = (): LoginToken => {
    const user: LoginToken = getStorage(USERINFO);
    return user
}

export const cleanUser = async () => {
    await setStorage(USERINFO, null);
    setTimeout(() => {
        window.location.href = "/account/login";
    }, 350);
}
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj: any = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
    if (key) {
        return key in obj
    } else {
        const keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt: any) => {
    let time = ''
    const date = new Date()
    const o: any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            time = fmt.replace(
                RegExp.$1,
                (RegExp.$1.length === 1) ?
                    (o[k]) :
                    (("00" + o[k]).substr(("" + o[k]).length)
                    )
            )
        }
    }
    return time
}

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date: any, fmt: string) => {
    let time = ''
    const o: any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            time = fmt.replace(
                RegExp.$1,
                (RegExp.$1.length === 1) ?
                    (o[k]) :
                    (("00" + o[k]).substr(("" + o[k]).length)
                    )
            )
        }
    }
    return time
}

// copy in the 'fx-fuli' utils
/**
 * 校验手机号是否正确
 * @param phone 手机号
 */

export const verifyPhone = (phone: string | number) => {
    const reg = /^1[34578][0-9]{9}$/
    const _phone = phone.toString().trim()
    let toastStr = _phone === '' ? '手机号不能为空~' : !reg.test(_phone) && '请输入正确手机号~'
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _phone
    }
}

export const verifyStr = (str: string | number, text: string) => {
    const _str = str.toString().trim()
    const toastStr = _str.length ? false : `请填写${text}～`
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _str
    }
}

// 截取字符串
export const sliceStr = (str: any, sliceLen: number) => {
    if (!str) { return '' }
    let realLength = 0
    const len = str.length
    let charCode = -1
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        } else {
            realLength += 2
        }
        if (realLength > sliceLen) {
            return `${str.slice(0, i)}...`
        }
    }

    return str
}


/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
    let buf: any
    if (jsonObj instanceof Array) {
        buf = []
        let i = jsonObj.length
        while (i--) {
            buf[i] = objClone(jsonObj[i])
        }
        return buf
    } else if (jsonObj instanceof Object) {
        buf = {}
        for (let k in jsonObj) {
            buf[k] = objClone(jsonObj[k])
        }
        return buf
    } else {
        return jsonObj
    }
}


/**
 * localStoreage 设置本地存储 添加有效期
 * @param {String | String} key 存储的key值
 * @param {Object | Json} jsonObj 存储的value值
 * @param {Object | Json} conf 存储时的配置对象
 * @return {Object | Json} 返回存储时的value值
 */

interface StorageConf {
    exp?: number,
}
interface StorageJson<T> {
    startTime?: number,
    endTime?: number,
    exp?: number,
    data: T
}
export const setStorage = <T>(key: string, jsonObj: T, conf: StorageConf = {}): T => {
    let exp: number = conf.exp || 0;
    const nowTime: number = Date.now();
    if (jsonObj) {
        let dealJsonObj: StorageJson<T> = {
            data: jsonObj
        }
        if (exp) {
            dealJsonObj = {
                ...dealJsonObj,
                startTime: nowTime,
                endTime: nowTime + exp * 1000 * 3600 * 24,
                exp,
            }
        }
        localStorage.setItem(key, JSON.stringify(dealJsonObj));
        return jsonObj;
    } else {
        localStorage.removeItem(key);
        return jsonObj;
    }
}



/**
 * localStoreage 获取本地存储 判断有效期
 * @param {String | String} key 要获取存储时的key值
 * @return {Object | Json} 返回 状态失效或者存储时的value值
 */

export const getStorage = (key: string) => {
    let nowTime: number = Date.now();
    let jsonStr: string = JSON.stringify({});
    let data: any = JSON.parse(localStorage.getItem(key) || jsonStr);
    if (data.exp) {
        if (nowTime > data.endTime) {
            setStorage<null>(key, null);
            return null;
        } else {
            return data.data;
        }
    } else {
        return data.data;
    }
}

// 节流 在一段时间内只能执行一次方法
export function throttle(fn: any, gapTime: number = 1000) {
    let _lastTime: number | null = null;

    // 返回新的函数

    return function (this: any) {
        let _nowTime: number = +new Date();

        if (_nowTime - Number(_lastTime) > gapTime || !_lastTime) {
            fn.apply(this, arguments); // 将this和参数传给原函数

            _lastTime = _nowTime;
        }
    };
}

/* 防抖 */
export function debounce(fn: any, waitTime: number = 300) {
    let _timer: NodeJS.Timeout | null = null;
    return function (this: any, ...arg: any[]) {
        if (_timer) {
            clearTimeout(_timer);
        }
        _timer = setTimeout(fn.bind(this, ...arg), waitTime);
    };
}


export function getPostFulllUrl(postId: number, type: 1 | 2 = 1): string {
    return (type === 2 ? window.location.origin : '') + "/post/" + window.btoa(`${postId}`);
}

export function copyPostUrl(postId: number) {
    const url: string = getPostFulllUrl(postId, 2);
    copy(url);
    notification.success({ message: "分享链接已复制到剪切板" })
}
export function copy(text: string) {
    let copy = document.createElement("textarea");
    document.body.appendChild(copy);
    copy.value = text;
    copy.select();
    document.execCommand("copy");
    document.body.removeChild(copy);
}

export function toComment(comment: string = ''): string {
    return comment.replace(/(\@.+)\s{1}/g, (match, $1: string) => {
        let idx = $1.indexOf(' ');
        let userName = $1;
        let rightTxt = '';
        if (idx > -1) {
            rightTxt = $1.slice(idx) + ' ';
            userName = $1.slice(0, idx);
        } else {
        }
        userName = userName.replace(/^@{1}/, '').trimRight();
        return `<a href='/${userName}'>@${userName}</a> ${rightTxt}`
    })
}
