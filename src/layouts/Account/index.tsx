import React, { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { AccountWrapper } from './style'

let timer = null as null | NodeJS.Timeout

export default function AcctountLayout(props: RouteConfigComponentProps) {
  const [idx, setIdx] = useState(1)

  useEffect(() => {
    timer = setTimeout(() => {
      let newIdx = idx
      newIdx++
      if (newIdx > 5) {
        newIdx = 1
      }
      setIdx(newIdx)
    }, 3500)
    return () => {
      timer && clearInterval(timer)
      timer = null
    }
  }, [idx])

  return (
    <AccountWrapper>
      <div className="account-container">
        <div className="account-bg">
          <div className="toogle-image">
            <ul className="img">
              <li style={{ opacity: idx === 1 ? 1 : 0 }} className="li1" />
              <li style={{ opacity: idx === 2 ? 1 : 0 }} className="li2" />
              <li style={{ opacity: idx === 3 ? 1 : 0 }} className="li3" />
              <li style={{ opacity: idx === 4 ? 1 : 0 }} className="li4" />
              <li style={{ opacity: idx === 5 ? 1 : 0 }} className="li5" />
            </ul>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(props.route?.routes ?? [])}
        </Suspense>
      </div>
    </AccountWrapper>
  )
}
