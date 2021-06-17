export interface User {
    id: string;
    userId: string;
    userName: string;
    phoneNumber: string;
    passWord: string;
    img: string;
    name: string;
    signature: string;
    website: string;
    badge: number;
    addTime: string; // date
    lastTime: string; // date
    // posts?: Post[];
    // vr?: VisitRecord[];
}

export interface IUserInfo {
    badge: number;
    img: string;
    name: string;
    signature: string;
    userId: string;
    userName: string;
    website: string;
}

export interface IOtherUser extends IUserInfo {
    postNum: number;
    fansNum: number;
    focusNum: number;
    focused: boolean;
}

export interface IOwnUser extends IOtherUser {
    phoneNumber: string;
    postNum: number;
    fansNum: number;
    focusNum: number;
    focused: boolean;
}

export interface IUpdateUserInfo {
    addTime?: string;
    badge?: number;
    img?: string;
    name?: string | null;
    password?: string;
    signature?: string | null;
    userId?: string;
    userName?: string;
    website?: string | null;
    // lastTime?: string;
    // postNum?: number;
    // fansNum?: number;
    // focusNum?: number;
    phoneNumber?: string;
}

export interface IFans extends IUserInfo {
    focused: boolean;
}

export type IFocus = IFans;
