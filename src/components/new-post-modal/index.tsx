import Carousel from '@/components/carousel'
import { addPost } from '@/network/modules/post'
import { Input, notification, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import imageConversion from 'image-conversion'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { UploadFile } from "antd/lib/upload/interface";
import { uploadImage } from '../../config/index'
import { IPost } from '../../types/posts'
import { NewPostModalWrapper } from './style'
const { TextArea } = Input

interface Props {
  userName: string
  img: string
  signature: string
  isOpenSendPost: boolean
  toggleNewPostModel(status?: boolean): void
  addNewPost(post: IPost): void
}

interface State {
  previewVisible: boolean
  previewImage: string
  postMessage: string
  faces: string[]
  faceBoard: boolean
  /* 0 没有选择 没有上传过图片 | 2 上传过图片了 */
  uploadStatus: 0 | 2
  imgList: string[]
  imgIdx: number
}

export default class NewPost extends Component<Props, State> {
  public state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      postMessage: '',
      faces: [
        '😁',
        '😂',
        '🤣',
        '😃',
        '😄',
        '😅',
        '😆',
        '😉',
        '😊',
        '😋',
        '😎',
        '😍',
        '😘',
        '😗',
        '😙',
        '😚',
        '🙂',
        '🤗',
        '🤩',
        '🤔',
        '🤨',
        '😐',
        '😑',
        '😶',
        '🙄',
        '😏',
        '😣',
        '😥',
        '😮',
        '🤐',
        '😓',
        '😯',
        '😪',
        '😫',
        '😴',
        '😌',
        '😛',
        '😜',
        '😝',
        '🤤',
        '😒',
        '😔',
        '😕',
      ],
      faceBoard: false,
      uploadStatus: 0,
      imgList: [],
      imgIdx: 0,
    }
  }

  public componentDidMount() {
    window.addEventListener('keyup', this.escHandle)
  }

  public componentWillUnmount() {
    window.removeEventListener('keyup', this.escHandle)
  }

  private contentEl: any
  public render() {
    const { postMessage, uploadStatus, imgList, imgIdx } = this.state
    const { userName, img, signature, isOpenSendPost } = this.props
    const beforeUploadFn = this.beforeUploadFn.bind(this)
    // const toggleFaceBoard = this.toggleFaceBoard.bind(this);

    let ImageUpload = () => {
      return (
        <section className="image-upload">
          <div className="upload-btns">
            <span className="icon camera" />
            <span>上传图片</span>
            <span className="local-upload">
              <Upload
                className="avatar-image"
                showUploadList={false}
                beforeUpload={beforeUploadFn}
                action={uploadImage}
                onChange={this.handleChange}
              />
            </span>
          </div>
          <div className="upload-btns">
            <span
              className="icon network"
              onClick={() => {
                this.changeUploadStatus(1)
              }}
            />
            <span>从网络添加图片</span>
          </div>
        </section>
      )
    }

    let ImgUpload = () => {
      return (
        <section className="input-url" key={2}>
          <div className="notice">
            <span className="close-circle" onClick={this.closeInpuUrl} />
            <i className="icon" />
            <span>
              <Upload
                className="avatar-image"
                showUploadList={false}
                beforeUpload={beforeUploadFn}
                action={uploadImage}
                onChange={this.handleChange}
              >
                添加另一张
              </Upload>
            </span>
          </div>
        </section>
      )
    }

    let UploadPlaceholder = () => {
      return (
        <div>
          {uploadStatus === 2 ? <ImgUpload /> : ''}
          {uploadStatus === 0 ? <ImageUpload /> : ''}
        </div>
      )
    }

    return (
      <NewPostModalWrapper
        className="page-send-post"
        style={{ display: isOpenSendPost ? 'block' : 'none' }}
        onClick={this.clickOutSideClose}
      >
        <div
          className="send-post-content"
          ref={(contentEl) => (this.contentEl = contentEl)}
        >
          <section className="user-info">
            <div className="avatar">
              <Link to={`/${userName}`}>
                <img src={img} alt={userName} />
              </Link>
            </div>
            <div className="user-text">
              <div className="user-name">
                <Link to={`/${userName}`}>{userName}</Link>
              </div>
              <div className="signature">{signature}</div>
            </div>
          </section>
          <section className="post-imgs">
            {imgList.length > 0 ? (
              <section className="image-list">
                <Carousel
                  type="other"
                  imgList={imgList}
                  imgIdx={imgIdx}
                  setIdx={(imgIdx: number) =>
                    this.setState({
                      imgIdx,
                    })
                  }
                />
              </section>
            ) : (
              ''
            )}
            <div className="upload-style">
              <UploadPlaceholder />
            </div>
          </section>

          {/* <div className="send-post">
                        <div className="message-input">
                            <TextArea
                                placeholder="谢谢心情"
                                autosize={true}
                                value={postMessage}
                                onChange={handleMessageChange}
                            />
                            <div className="face-img" onClick={toggleFaceBoard}>
                                <ul
                                    style={{
                                        display: faceBoard ? "grid" : "none"
                                    }}
                                    className="faces"
                                >
                                    {this.createFace()}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="send-post-btn">
                        <Button
                            type="primary"
                            onClick={sendMessage}
                            block={true}
                        >
                            分享
                        </Button>
                    </div> */}
          <div className="descript">
            <TextArea
              cols={50}
              rows={15}
              autoSize={true}
              value={postMessage}
              onChange={this.handleMessageChange}
              placeholder="愿意的话可以添加说明"
            />
          </div>
          <footer className="footer">
            <span
              className="close"
              onClick={() => this.props.toggleNewPostModel(false)}
            >
              关闭
            </span>
            <span className="post" onClick={this.sendMessage}>
              发贴
            </span>
          </footer>
        </div>
      </NewPostModalWrapper>
    )
  }

  private escHandle = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.props.toggleNewPostModel(false)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  private clickOutSideClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!this.contentEl.contains(e.target)) {
      this.props.toggleNewPostModel(false)
    }
  }

  private closeInpuUrl = () => {}

  private changeUploadStatus = (uploadStatus?: number) => {}

  // private toggleFaceBoard() {
  //     const faceBoard: boolean = this.state.faceBoard;
  //     this.setState({ faceBoard: !faceBoard });
  // }

  private handleMessageChange = (e: { target: { value: string } }) => {
    this.setState({
      postMessage: e.target.value,
    })
  }

  // private createFace() {
  //     const { faces } = this.state;
  //     return faces.map((item, index) => {
  //         return (
  //             <li key={index} onClick={this.changeMessage.bind(this, item)}>
  //                 {item}
  //             </li>
  //         );
  //     });
  // }

  // private changeMessage(this: any, face: string) {
  //     let { postMessage } = this.state;
  //     this.setState({ postMessage: postMessage + face });
  // }

  private sendMessage = async () => {
    const { postMessage, imgList } = this.state
    const imgs: string[] = [...imgList]

    if (!imgs.length) {
      notification.warn({ message: '最少有一张心情图片哦!' })
      return
    }
    if (!postMessage.trim()) {
      notification.warn({ message: '要填写心情内容哦！' })
      return
    }

    addPost(postMessage, imgs).toPromise().then((result) => {
      this.setState({
        postMessage: '',
        imgList: [],
        imgIdx: 0,
        uploadStatus: 0,
      })
      this.props.addNewPost(result.data)
      this.props.toggleNewPostModel(false)
      notification.success({ message: '帖子发送成功' })
    })
  }

  private beforeUploadFn = (file: RcFile): any => {
    return new Promise((resolve, reject) => {
      let isLt350K = file.size / 1024 / 1024 < 0.35
      // 判定图片大小是否小于0.35MB/350kb
      if (isLt350K) {
        resolve(file)
      }
      imageConversion
        .compressAccurately(file, {
          size: 350,
          // scale: 0.5
        })
        .then((res) => {
          interface IFile extends File {
            uid?: string
          }
          let dealFile: IFile = new File([res], file.name, {
            type: file.type,
          })
          dealFile.uid = `rc-upload-${Date.now()}`
          resolve(dealFile)
        })
    })
  }

  private handleChange = async (info: { file: any; fileList: any[] }) => {
    if (info.file.status === 'done') {
      const img = info.file.response.data[0]
      const imgList = [...this.state.imgList, img]
      this.setState({ imgList, uploadStatus: 2, imgIdx: imgList.length - 1 })
    }
  }
}
