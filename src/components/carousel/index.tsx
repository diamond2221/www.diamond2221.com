import { memo, useState } from 'react'
import { CarouselWrapper } from './style'

export interface IProps {
  imgList: string[]
  type?: 'index' | 'detail' | 'other'
  children?: any
  imgIdx?: number
  setIdx?(idx: number): void
}

export function Carousel(props: IProps) {
  const [defaultImgIdx, setDefaultImgIdx] = useState(props.imgIdx || 0)
  const { imgList, type } = props

  const toogleImg: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    let newDefaultImgIdx = defaultImgIdx
    const { imgList } = props
    const len = imgList.length
    const dir = e.currentTarget.dataset['dir'] as 'next' | 'prev'
    if (dir === 'next') {
      newDefaultImgIdx++
      // 下一张
    } else if (dir === 'prev') {
      newDefaultImgIdx--
      // 上一张
    }
    if (newDefaultImgIdx < 0) {
      newDefaultImgIdx = len - 1
    } else if (newDefaultImgIdx > len - 1) {
      newDefaultImgIdx = 0
    }
    setDefaultImgIdx(newDefaultImgIdx)
    if (props.setIdx) {
      props.setIdx(newDefaultImgIdx)
    }
  }

  return (
    <CarouselWrapper className={`${type}`}>
      <div className="imgs">
        {imgList.map((img, index) => {
          return (
            <img
              key={index}
              className={defaultImgIdx === index ? 'show-img' : 'hide-img'}
              src={img}
              alt=""
            />
          )
        })}
      </div>
      {props.children}
      <div className="toogleImg" hidden={imgList.length > 1 ? false : true}>
        <span className="prve-img" data-dir="prev" onClick={toogleImg} />
        <span className="next-img" data-dir="next" onClick={toogleImg} />
      </div>
    </CarouselWrapper>
  )
}

export default memo(Carousel, (prevProps, nextProps) => {
  return (
    typeof prevProps.imgIdx === 'number' &&
    prevProps.imgIdx !== nextProps.imgIdx
  )
})
