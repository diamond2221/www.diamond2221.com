export interface ILoginParams {
    userName: string;
    passWord: string;
}
export interface IRegisterParams extends ILoginParams {
    phoneNumber: number;
    rePassWord: string;
    verifyCode: string
}
