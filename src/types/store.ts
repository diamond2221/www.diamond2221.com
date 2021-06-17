import { IPost } from './posts';
import { IOwnUser } from "./user";
export interface IStoreState {
    userInfo: IOwnUser | null;
    isOpenSendPost: boolean;
    showDetailCard: boolean;
    detailCardInfo: null | IPost;
    fromPath: string,
    newPost: IPost | null,
    host: string, // 'com' | 'club' | 'cn'
    beian: string
}
