import { makeObservable, observable, action } from "mobx";

export class AppStore {
  constructor() {
    makeObservable(this)
  }

  @observable public fromPath = ''
  @observable public beian = '晋ICP备19002402号-3'

  @action.bound
  public updateFromPath(fromPath: string) {
    this.fromPath = fromPath
  }
}

const appStore = new AppStore()
export default appStore
