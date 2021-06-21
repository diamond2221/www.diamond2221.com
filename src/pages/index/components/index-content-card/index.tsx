import React, { PureComponent } from 'react'
import { IndexContentCardWrapper } from './style'
import { Card, Input, notification } from 'antd'
import Carusel from '@/components/carousel'
import Avatar from '@/components/avatar'
import LoveStar from '@/utils/LoveStar'
import { Link } from 'react-router-dom'
import {
  markPost,
  cancelMarkPost,
  addComments,
  likePost,
  cancelLikePost,
} from '../../../../network/modules/post'
import { IPost, IPostCommentRes } from 'src/types/posts'
import { copyPostUrl, getPostFulllUrl, toComment } from 'src/utils/common'
import SetPostStatus from '@/components/set-post-status'

interface Props {
  post: IPost
  userId: string
}

export default class IndexContentCard extends PureComponent<Props> {
  state = {
    lookMore: false,
    newComment: '',
    post: this.props.post,
    likeIng: false,
    actionModel: false,
  }

  public contentEl: any
  public inputRef: any
  public loveRef: any
  public render() {
    const {
      post,
      newComment,
      // lookMore,
      actionModel,
    } = this.state
    const addComment = this.addComment.bind(this)
    const setNewComment = this.setNewComment.bind(this)
    const markPostFn = () => {
      if (!post.marked) {
        return this.markPost.bind(this, post)
      } else {
        return this.cancelMarkPost.bind(this, post)
      }
    }
    const likePostFn = () => {
      if (!post.liked) {
        return this.dbLikePostFn.bind(this, null)
      } else {
        return this.cancelListPost.bind(this, post)
      }
    }
    return (
      <IndexContentCardWrapper>
        <Card key={post.postId}>
          <div className="u-title">
            <Avatar
              userName={post.userName}
              img={post.img}
              avatarStyle={{
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            <div className="u-name">
              <Link to={'/' + post.userName}>{post.userName}</Link>
            </div>
            <div className="actions-wrap">
              <div className="actions" onClick={this.toggleActionModel}>
                <div className="circles" />
              </div>
            </div>
          </div>
          <div className="img-wrap">
            <Carusel imgList={post.imgs} type="index">
              <div
                ref={(loveRef) => (this.loveRef = loveRef)}
                className="like-mask"
                onDoubleClick={(e) => this.dbLikePostFn(e)}
              />
            </Carusel>
          </div>
          <div className="user-action">
            <p>
              <span
                className={'mark ' + (post.marked ? 'marked' : '')}
                onClick={markPostFn()}
              />
              <span
                className={'like ' + (post.liked ? 'liked' : '')}
                onClick={likePostFn()}
              />
              <span className="message" onClick={() => this.inputRef.focus()} />
              <span
                className="share"
                onClick={() => copyPostUrl(post.postId)}
              />
            </p>
            <p className="likenum">
              {post.likeNum ? post.likeNum + '次赞' : '快点赞吧'}
            </p>
            <Link to={'/'}>{post.addTime}</Link>
          </div>
          <div className="user-comments">
            <div className="own-comments">
              <p>
                <Link to={'/' + post.userName} className="comments-owner">
                  {post.userName}
                </Link>
                <span className="comment-content">{post.content}</span>
              </p>
            </div>
            {/* onClick={this.lookMore.bind(this, post.comments)} */}
            <Link
              hidden={!post.comment.count}
              className="look-more-comments"
              to={getPostFulllUrl(post.postId)}
            >
              全部{post.comment.count}条评论
            </Link>
            <div className="other-comments">
              {this.createComments(post.comment)}
            </div>
            <div className="add-comments">
              <Input
                onPressEnter={addComment}
                placeholder="添加评论..."
                ref={(inputRef) => (this.inputRef = inputRef)}
                value={newComment}
                onChange={setNewComment}
              />
            </div>
          </div>
        </Card>
        {actionModel ? (
          <div
            className="setting-wrap"
            onClick={(e) => {
              if (actionModel && !this.contentEl.contains(e.target)) {
                this.toggleActionModel()
              }
            }}
          >
            <div className="setting">
              <div
                className="sets"
                ref={(contentEl) => (this.contentEl = contentEl)}
              >
                <Link
                  to={'/post/' + window.btoa(post.postId + '') + '/'}
                  className="set-item"
                >
                  打开帖子
                </Link>
                {post.userId === this.props.userId ? (
                  <SetPostStatus
                    detailCardInfo={post}
                    closeHandle={this.toggleActionModel}
                  />
                ) : (
                  ''
                )}
                <button className="set-item" onClick={this.toggleActionModel}>
                  取消
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </IndexContentCardWrapper>
    )
  }

  private setNewComment(e: { target: { value: any } }) {
    this.setState({
      newComment: e.target.value,
    })
  }
  /**
   * 添加帖子评论
   * @private
   * @memberof IndexContentCard
   */
  private addComment() {
    const content: string = this.state.newComment
    const post: IPost = this.state.post
    const postId: number = post.postId
    // const userId: string = this.props.userInfo.userId;
    if (!content.trim()) {
      notification.warn({ message: '请输入评论内容' })
      return
    }
    addComments({
      content,
      postId,
      pId: 0,
      rId: 0,
    }).toPromise().then((newComment) => {
      // notification.success({
      //     message: "评论成功"
      // });
      this.setState({
        post: {
          ...post,
          comment: {
            count: post.comment.count + 1,
            edges: {
              count: post.comment.edges.count + 1,
              edges: [newComment, ...post.comment.edges.edges],
            },
          },
        },
        newComment: '',
      })
    })
  }


  private createComments(comments: IPostCommentRes) {
    // const { lookMore } = this.state;
    let DealComments = comments

    return DealComments.edges.edges.slice(0, 3).map((comment, index) => {
      return (
        <p key={index}>
          <Link to={'/' + comment.userName} className="comments-owner">
            {comment.userName}
          </Link>
          <span
            className="comment-content"
            dangerouslySetInnerHTML={{ __html: toComment(comment.content) }}
          />
          <span className="comment-time">{'评论于 ' + comment.addTime}</span>
        </p>
      )
    })
  }

  /**
   * @description 用户喜欢帖子
   * @author ZhangYu
   * @date 2020-02-09
   * @private
   * @param {IPost} post
   * @memberof IndexContentCard
   */
  private async likePost() {
    const { post } = this.state
    try {
      await likePost(post.postId)
      this.setState({
        post: {
          ...this.state.post,
          liked: true,
          likeNum: this.state.post.likeNum + 1,
        },
      })
    } catch (error) {}
  }

  /**
   * @description 用户取消喜欢帖子
   * @author ZhangYu
   * @date 2020-02-09
   * @private
   * @param {IPost} post
   * @memberof IndexContentCard
   */
  private async cancelListPost(post: IPost) {
    try {
      await cancelLikePost(post.postId)
      this.setState({
        post: {
          ...this.state.post,
          liked: false,
          likeNum: this.state.post.likeNum - 1,
        },
      })
    } catch (error) {}
  }

  /**
   * @description 收藏该帖子
   * @author ZhangYu
   * @date 2019-09-22
   * @private
   * @param {number} postId
   * @memberof IndexContentCard
   */
  private async markPost(post: IPost) {
    try {
      await markPost(post.postId)
      this.setState({
        post: {
          ...this.state.post,
          marked: true,
        },
      })
    } catch (error) {}
  }

  /**
   * @description 取消收藏该帖子
   * @author ZhangYu
   * @date 2020-02-09
   * @private
   * @param {number} postId
   * @memberof IndexContentCard
   */
  private async cancelMarkPost(post: IPost) {
    try {
      await cancelMarkPost(post.postId)
      this.setState({
        post: {
          ...this.state.post,
          marked: false,
        },
      })
    } catch (error) {}
  }

  /**
   * @description 双击点赞帖子
   * @private
   * @memberof DeatilCard
   */
  private dbLikePostFn = async (e: any = null) => {
    if (e) {
      e.persist()
    }
    const { likeIng } = this.state
    const post = this.state.post
    new LoveStar(this.loveRef, e).show()
    const likeShow = () => {
      this.setState({
        likeIng: true,
      })
    }
    if (!likeIng) {
      if (post.liked) {
        // 直接展示点赞效果
        likeShow()
        this.setState({
          likeIng: false,
        })
      } else {
        // 直接展示点赞效果
        likeShow()
        await this.likePost()
        this.setState({
          likeIng: false,
        })
      }
    }
  }

  private toggleActionModel = () => {
    const { actionModel } = this.state
    this.setState({
      actionModel: !actionModel,
    })
  }
}
