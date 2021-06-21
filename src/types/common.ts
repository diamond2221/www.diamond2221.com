export interface LoginToken {
    userId: string;
    token: string;
}

export interface RowsData<T = any[]> {
    count: number;
    rows: T;
}
export interface Response<T = any> {
    message: string,
    data: T,
    code: number
}

export interface SelectOption<T = string | number> {
    label: string
    value: T
}

export interface Dictionay<T = any> {
  [key: string]: T
}
