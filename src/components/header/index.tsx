import { Input } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import Avatar from '@/components/avatar/index'
import { IUserInfo as IOwnUserInfo } from '@/types'
import { IUserInfo } from '@/types/user'
import { debounce } from '@/utils/common'
import { useState } from 'react'
import { useEffect } from 'react'
import { HeaderWrapper } from './style'
import * as UserService from '@/network/modules/user'
const { Search } = Input

interface Props extends RouteComponentProps {
  userInfo: IOwnUserInfo
}

enum EuserListstatus {
  show = 1,
  hide,
  none,
}

export function Header(props: Props) {
  let [scrollIng] = useState(false)
  let [userList, setuserList] = useState([] as IUserInfo[])
  let [showUserList, setshowUserList] = useState(EuserListstatus.hide)
  let [searchName, setsearchName] = useState('')
  let [focused, setfocused] = useState(false)

  let searchInp: Input | null = null

  const username: string = props.userInfo.userName
  const { pathname } = props.location

  function renderUserList() {
    return userList.map((user: IUserInfo) => {
      return (
        <Link
          key={user.userId}
          className="user-item"
          to={`/${user.userName}`}
          onMouseEnter={hoverUserHandle}
          onClick={resetValue}
        >
          <div className="user-inner">
            <Avatar
              img={user?.img}
              userName={user.userName}
              wrapElType="span"
              avatarStyle={{
                width: '32px',
                height: '32px',
                marginRight: '10px',
              }}
            />
            <div className="user-info">
              <div className="user-username">
                <span>{user.userName}</span>
              </div>
              <span className="user-name">{user.name}</span>
            </div>
          </div>
        </Link>
      )
    })
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollHeader)
    return () => {
      window.removeEventListener('scroll', scrollHeader)
    }
  })

  const scrollHeader = debounce(() => {
    let scrollIng: boolean = false
    if (document.documentElement.scrollTop >= 53) {
      scrollIng = true
    }
    return scrollIng
  }, 100)

  function hoverUserHandle() {}

  const search: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const name: string = e.target.value
    setsearchName(name)
    if (name.trim()) {
      try {
        const userResult = await UserService.searchUsers(
          e.target.value
        ).toPromise()
        const users = userResult.data
        setuserList(users)
        setshowUserList(
          users.length ? EuserListstatus.show : EuserListstatus.none
        )
      } catch (error) {
        console.log(error, '搜索用户出错了！')
      }
    } else {
      setuserList([])
      setshowUserList(EuserListstatus.hide)
    }
  }

  function resetValue() {
    setshowUserList(EuserListstatus.hide)
    setuserList([])
    setsearchName('')
  }
  function focusSearchInput() {
    if (!userList.length && !searchName) {
      setfocused(!focused)
    }
  }
  function enterUser() {
    if (showUserList && userList.length) {
      resetValue()
      setfocused(false)
      searchInp?.blur()
      props.history.push(`/${userList[0].userName}`)
    }
  }

  return (
    <HeaderWrapper style={{ height: scrollIng ? '52px' : '54px' }}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" />
        </div>
        <div className="f1" />
        <div className="search">
          {focused ? (
            <label>
              <Search
                ref={(el) => (searchInp = el)}
                value={searchName}
                onChange={(e) => search(e)}
                placeholder="搜索"
                onFocus={(e) => search(e)}
                autoFocus={focused}
                onBlur={focusSearchInput}
                onPressEnter={enterUser}
              />
            </label>
          ) : (
            <div className="search-block" onClick={focusSearchInput}>
              <span className="block-icon" />
              <span className="block-text">搜索</span>
            </div>
          )}
          {showUserList !== EuserListstatus.hide && focused ? (
            <div>
              <div
                className="dialog"
                onClick={() => setshowUserList(EuserListstatus.hide)}
              />
              <div className="users-wrap">
                <div className="arrow-top" />
                <div className="users">
                  <div className="users-list">
                    {showUserList === EuserListstatus.show ? (
                      renderUserList()
                    ) : (
                      <div className="no-user">找不到任何结果</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <ul className="header-nav">
          <li className={`index ${pathname === '/' ? 'active' : ''}`}>
            <Link to="/" />
          </li>
          <li className={`explore ${pathname === '/explore' ? 'active' : ''}`}>
            <Link to="/explore" />
          </li>
          {/* <li className={`suggested ${
                            pathname === "/suggested" ? "active" : ""
                            }`}> */}
          <li className="suggested">
            <span className="link" />
            {/* <Link to="/suggested" /> */}
          </li>
          <li
            className={`my ` + (pathname === `/${username}` ? 'isme' : '')}
            // hidden={!username}
          >
            <div className="wrap-avatar" />
            <Link to={username ? '/' + username : '/'}>
              <img src={props.userInfo.img} alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </HeaderWrapper>
  )
}

export default Header
