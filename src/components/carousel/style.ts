import styled from 'styled-components'
import spriteImg from '../../assets/image/sprite.png'

/*
 * @Author: ZhangYu
 * @Date:   2018-12-27 20:27:18
 * @Last Modified by: zhangyu
 * @Last Modified time: 2021-06-21 15:23:11
 */

export const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &.index {
    .imgs {
      padding: 0 0;
    }
  }
  &.detail {
    .imgs {
      padding: 5% 0;
    }
  }
  &.other {
  }
  &:hover {
    .toogleImg {
      display: block;
    }
  }
  .imgs {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    img {
      display: block;
      max-height: 600px;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      &.show-img {
        z-index: 2;
        opacity: 1;
        animation: show-img-animation 0.2s ease-in 0s;
      }
      &.hide-img {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }

  .toogleImg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0%;
    right: 0%;
    display: none;
    z-index: 2;
    span {
      position: absolute;
      width: 24px;
      height: 24px;
      // background: url('../../assets/image/sprite.png') no-repeat;
      background: url(${spriteImg}) no-repeat;
      background-size: 495px 483px;
      z-index: 100;
      cursor: pointer;
      &.prve-img {
        background-position: -155px -311px;
        left: 15px;
      }
      &.next-img {
        background-position: -124px -311px;
        right: 15px;
      }
    }
  }
`
