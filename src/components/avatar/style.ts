import styled from 'styled-components'
export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  a,
  .link-avatar {
    border-radius: 50%;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
    &::after {
      content: '';
      border: 1px solid rgba(0, 0, 0, 0.0975);
      bottom: 0;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`
