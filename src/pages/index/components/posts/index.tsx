import IndexContentCard from "../index-content-card";

import Loading from '@/components/loading/index'
import { LoadingOutlined } from '@ant-design/icons'
import { IPost } from '@/types/posts'
import { IUserInfo } from "@/types";

interface IProps {
  posts: IPost[] | null
  userInfo: IUserInfo
}
export default function Posts(props: IProps) {
  const { posts, userInfo } = props

  if (posts) {
    if (posts.length) {
      return (
        <div>
          {posts.map((post: IPost) => {
            return <IndexContentCard post={post} userId={userInfo.userId} key={post.postId} />
          })}
        </div>
      )
    } else {
      return <h2>暂时没有任何帖子哦😥</h2>
    }
  } else {
    const LoadingEl = (
      <LoadingOutlined spin={true}></LoadingOutlined>
    )
    return (
      <Loading
        size="large"
        indicator={LoadingEl}
        cusStyle={{ margin: '15vh 0 100vh' }}
      />
    )
  }
}
