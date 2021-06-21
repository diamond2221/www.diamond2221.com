import * as PostService from '@/network/modules/post'
import { AccountStore } from '@/store/account'
import { IPost } from '@/types/posts'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { RouteConfigComponentProps } from 'react-router-config'
import Posts from './components/posts'
import Suggested from './components/suggested'
import NewPostModal from '@/components/new-post-modal'
import { IndexWrapper } from './style'

function Index(
  props: RouteConfigComponentProps & { accountStore: AccountStore }
) {
  const [page, setPage] = useState(1)
  const [size] = useState(9)
  const [downLock, setDownLock] = useState(false)
  const [lock, setLock] = useState(false)
  const [posts, setPosts] = useState<IPost[] | null>([])

  const { userInfo } = props.accountStore

  useEffect(() => {
    getIndexPosts()
  })

  async function getIndexPosts() {
    if (downLock) {
      return
    }
    if (lock) {
      return
    }
    setLock(true)
    const res = await PostService.getIndexPosts(page, size).toPromise()

    setPosts([...(posts || []), ...(res.data || [])])
    setPage(page + 1)
    setDownLock(res.data.length < size ? true : false)
    setLock(false)
  }

  return (
    userInfo && (
      <IndexWrapper>
        <Helmet>
          <title>Diamond</title>
        </Helmet>

        <div className="page-container">
          <section className="index-main">
            <Posts posts={posts} userInfo={userInfo} />
            <div className="index-content-card" />
          </section>
          <section className="index-aside">
            <Suggested
              userName={userInfo.userName}
              img={userInfo.img}
              signature={userInfo.signature}
            />
          </section>
        </div>

        <NewPostModal
          userName={userInfo.userName}
          img={userInfo.img}
          signature={userInfo.signature}
          isOpenSendPost={true}
          toggleNewPostModel={() => {}}
          addNewPost={() => {}}
        />
      </IndexWrapper>
    )
  )
}

export default inject('accountStore')(observer(Index))
