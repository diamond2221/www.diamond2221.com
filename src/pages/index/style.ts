import styled from 'styled-components'

/*
 * @Author: ZhangYu
 * @Date:   2018-12-26 22:53:53
 * @Last Modified by:   ZhangYu
 * @Last Modified time: 2018-12-30 13:44:31
 */
export const IndexWrapper = styled.div`
  padding-top: 60px;
  .page-container {
    display: flex;
    .index-main {
      flex: 1;
    }
    .index-aside {
      width: 290px;
      height: 400px;
      position: sticky;
      top: 120px;
      margin-left: 30px;
      .my {
        padding: 15px 5px;
        display: flex;
        .img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #ccc;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin-bottom: 5px;
          a {
            color: black;
            font-weight: 500;
          }
        }
      }
    }
  }
`
