import { IUserInfo } from '@/types'
import { IUpdateUserInfo } from '@/types/user'
import { getUser } from '@/utils/common'
import { action, makeObservable, observable } from 'mobx'

export class AccountStore {
  constructor() {
    makeObservable(this)
  }
  @observable public userInfo: null | IUserInfo = null
  @observable public userId: string | null = getUser()?.userId
  @observable public token: string | null = getUser()?.token

  @action.bound
  public Login(userInfo: IUserInfo) {
    this.userInfo = userInfo
  }

  @action.bound
  public UpdateUserInfo(userInfo: IUpdateUserInfo) {
    this.userInfo = {
      ...(this.userInfo as IUserInfo),
      badge: this.userInfo?.badge || userInfo?.badge || 0,
      name: this.userInfo?.name || userInfo?.name || '',
      signature: this.userInfo?.signature || userInfo?.signature || '',
      userName: this.userInfo?.userName || userInfo?.userName || '',
      website: this.userInfo?.website || userInfo?.website || '',
      phoneNumber: this.userInfo?.phoneNumber || userInfo?.phoneNumber || '',
      img: this.userInfo?.img || userInfo.img || '',
    }
  }

  // @computed
  // public get userInfo() {
  //   return {
  //     userName: this.userName,
  //     phoneNumber: this.phoneNumber,
  //     sex: this.sex,
  //     sexStr: this.sexStr,
  //     token: '',
  //     uid: '',
  //   }
  // }
}

const accountStore = new AccountStore()
export default accountStore
