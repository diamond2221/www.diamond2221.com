export interface IPost {
    postId: number;
    userId: string;
    userName: string;
    img: string;
    content: string;
    imgs: [string];
    comment: IPostCommentRes;
    addTime: string;
    likeNum: number;
    marked: boolean;
    liked: boolean;
    focused: boolean;
    status: IPostStatus;
}

export interface IUserPost {
    userId: string;
    postId: number;
    content: string;
    addTime: string;
    imgs?: string[];
    likeNum: number;
    comments: IPostCommentRes
    status: IPostStatus;
}
export interface PostAllInfo extends IUserPost {
    userName: string;
    img: string;
    liked: boolean;
    marked: boolean;
    focused: boolean;
}
export interface BaseComment {
    id: number;
    content: string;
    rId: number;
    addTime: string;
    postId: number;
    userId: string;
}
export interface IPostComment extends BaseComment {
    userName: string;
    userImg: string;
}



export interface IPostComments extends IPostComment {
    edges: {
        count: number;
        edges: IPostComment[]
    };
}

export interface IPostCommentRes {
    edges: {
        edges: IPostComments[];
        count: number;
    },
    count: number;
}




export enum EReplyType {
    "POST" = 0,
    "USER"
}


export interface IAddComments {
    postId: number;
    content: string;
    rId: number;
    pId: number;
}


export type IPostStatus = 1 | 2 | 3;
