import { fetchRecommendUser, focusUser } from '@/network/modules/user'
import Avatar from '@/components/avatar'
import Loading from '@/components/loading'
import { IOtherUser } from '@/types/user'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SuggestedWrapper } from './style'

interface IProps {
  userName: string
  img: string
  signature: string
  toggleNewPostModel?(): void
}

export default class Index extends Component<IProps> {
  public state: {
    followList: IOtherUser[]
    loading: boolean
  }
  constructor(props: IProps) {
    super(props)
    this.state = {
      followList: [],
      loading: true,
    }
  }

  public componentWillMount() {
    this.fetchRecommendUser()
  }

  public render() {
    const {
      userName = '',
      img = '',
      signature = '',
      toggleNewPostModel,
    } = this.props
    const { followList, loading } = this.state

    return (
      <SuggestedWrapper>
        <section className="user-info">
          <Avatar
            userName={userName}
            img={img}
            avatarStyle={{ marginRight: '12px' }}
          />
          <div className="user-text">
            <div className="user-name">
              <Link to={`/${userName}`}>{userName}</Link>
            </div>
            <div className="signature">{signature}</div>
          </div>
        </section>
        <section className="add-post-btn" onClick={toggleNewPostModel}>
          发帖
        </section>
        <section className="container">
          <nav className="title">推荐关注</nav>
          {loading ? (
            <Loading loadText="探索用户中..." />
          ) : followList.length === 0 ? (
            <p className="notice">暂无推荐</p>
          ) : (
            <ul className="friend_photo">
              {followList.map((item, index) => {
                return (
                  <li className="list" key={index}>
                    <section className="user">
                      <Avatar
                        userName={item.userName}
                        img={item.img}
                        avatarStyle={{
                          minWidth: '32px',
                          height: '32px',
                          width: '32px',
                          marginRight: '12px',
                        }}
                      />
                      <div className="user-text">
                        <div className="user-name">
                          <Link to={`/${item.userName}`}>{item.userName}</Link>
                        </div>
                        <div className="signature">{item.signature}</div>
                      </div>
                    </section>
                    {item.focused ? (
                      <span className="follow">已关注</span>
                    ) : (
                      <span
                        className="follow"
                        onClick={() => {
                          this.focuUser(item)
                        }}
                      >
                        关注
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </SuggestedWrapper>
    )
  }

  private async fetchRecommendUser() {
    this.setState({ loading: true })
    const result = await fetchRecommendUser(1, 5).toPromise()
    this.setState({
      followList: result.data.rows,
      loading: false,
    })
  }

  public focuUser = async (user: IOtherUser) => {
    if (!user.focused) {
      let { followList } = this.state

      try {
        await focusUser(user.userId).toPromise()
        followList = followList.filter((item) => {
          if (item.userId === user.userId) {
          }
          // return item.userId !== user.userId;
          return true
        })
        user.focused = true
        this.setState({
          followList,
        })
      } catch (error) {}
      // notification.success({ message: "关注成功" });
    }
  }
}
