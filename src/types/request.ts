export interface IResponse<T = any> {
    code: number;
    data: T;
    message: string;
}

export interface IDResponse extends Response {
    code: number;
    data: any;
    message: string;
}
