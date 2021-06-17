export const RegPhone = (value: string): boolean => {
    return !/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
}
// tslint:disable-next-line: unified-signatures
export function checkUsername(this: any, fiel: any, value: string,  callback: (arg?: Error) => void) {
    if (!value) {
        this.setState({
            userNameRule: {
                validateStatus: "error",
                help: "请输入用户名"
            }
        });
        return callback(new Error("请输入用户名"));
    }
    if (!/^\w{3,18}$/.test(value) && !/^[0-9]+$/.test(value)) {
        this.setState({
            userNameRule: {
                validateStatus: "error",
                help: "用户名要求字母数字下划线3-18位"
            }
        });
        return callback(new Error("用户名要求字母数字下划线3-18位"));
    }
    this.setState({
        userNameRule: {
            validateStatus: "success",
            help: ""
        }
    });
    callback();
}

// tslint:disable-next-line: unified-signatures
export function checkPassword(this: any, fiel: any, value: string,  callback: (arg?: Error) => void) {
    if (!value) {
        this.setState({
            passWordRule: {
                validateStatus: "error",
                help: "请输入密码"
            }
        });
        return callback(new Error("请输入密码"));
    }
    if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
        this.setState({
            passWordRule: {
                validateStatus: "error",
                help: "密码要求包含字母和数字,并且是6到18位之间"
            }
        });
        return callback(new Error("密码要求包含字母和数字,并且是6到18位之间"));
    }
    this.setState({
        passWordRule: {
            validateStatus: "success",
            help: ""
        }
    });
    callback();
}

// tslint:disable-next-line: unified-signatures
export function checkPasswordAgian(this: any, fiel: any, value: any,  callback: (arg?: Error) => void) {
  console.log(this.state, value)
    if (!value) {
        this.setState({
            rePassWordRule: {
                validateStatus: "error",
                help: "请输入确认密码"
            }
        });
        return callback(new Error("请输入确认密码"));
    }
    if (this.props.form.getFieldValue("passWord") !== value) {
        this.setState({
            rePassWordRule: {
                validateStatus: "error",
                help: "请确认重复密码"
            }
        });
        return callback(new Error("请确认重复密码"));
    }
    this.setState({
        rePassWordRule: {
            validateStatus: "success",
            help: ""
        }
    });
    callback();
}

// tslint:disable-next-line: unified-signatures
export function checkNoEmpty(this: any, fiel: string, value: any, callback: (arg?: Error) => void) {
    if (!value) {
        return callback(new Error("请输入或选择内容"));
    }
    callback();
}

export function checkPhoneNumber(this: any, fiel: string, value: any, callback: (arg?: Error) => void) {
    if (!value) {
        this.setState({
            phoneNumberRule: {
                validateStatus: "error",
                help: "请输入手机号"
            }
        });
        return callback(new Error("请输入手机号"));
    }
    if (RegPhone(value)) {
        this.setState({
            phoneNumberRule: {
                validateStatus: "error",
                help: "请输入正确的手机号"
            }
        });
        return callback(new Error("请输入正确的手机号"));
    }
    this.setState({
        phoneNumberRule: {
            validateStatus: "success",
            help: ""
        }
    });
    callback();
}

export function checkVerifyCode(this: any, fiel: string, value: any, callback: (arg?: Error) => void) {
    if (!value) {
        return callback(new Error("请输入验证码"));
    }
    if (!/\d{6}/.test(value)) {
        return callback(new Error("请输入正确的验证码"));
    }
    callback();
}
