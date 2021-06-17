import { User } from "./user";

export type IUserInfo = Omit<User, 'passWord' | 'lastTime' | 'addTime' | 'id'> & { token: string }
