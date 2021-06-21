import { Link } from 'react-router-dom'
import {AvatarWrapper} from './style'

export interface IProps {
  img: string
  userName: string
  avatarStyle?: React.CSSProperties
  wrapElType?: 'span' | 'div'
}

export default function Avatar(props: IProps){
  const { img = '', userName = '', avatarStyle, wrapElType } = props
    const Content = () => {
      if (wrapElType === 'span') {
        return (
          <span className="link-avatar">
            <img src={img} alt={userName} />
          </span>
        )
      } else if (wrapElType === 'div') {
        return (
          <div className="link-avatar">
            <img src={img} alt={userName} />
          </div>
        )
      } else {
        return (
          <Link to={`/${userName}`}>
            <img src={img} alt={userName} />
          </Link>
        )
      }
    }
    return (
      <AvatarWrapper className="avatar-wrapper" style={avatarStyle}>
        {Content()}
      </AvatarWrapper>
    )
}
