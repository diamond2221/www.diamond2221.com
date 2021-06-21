import styled from 'styled-components'

export const SuggestedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .user-info {
    display: flex;
    margin-bottom: 20px;
    .user-text {
      font-size: 16px;
      display: flex;
      flex-direction: column;
      line-height: 18px;
      .user-name {
        margin-top: 3px;
        a {
          color: black;
        }
      }
      .signatura {
        color: #87939e;
      }
    }
  }
  .add-post-btn {
    text-align: center;
    width: 100%;
    height: 42px;
    line-height: 42px;
    border: 1px solid #efefef;
    border-radius: 5px;
    padding: 0 20px;
    background: #fff;
    text-align: center;
    color: #7f7e7e;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .container {
    max-height: 350px;
    overflow-y: auto;
    border: 1px solid #efefef;
    border-radius: 5px;
    padding: 0 20px 20px;
    margin: 10px 0 20;
    background: #fff;
    .title {
      height: 46px;
      color: #999;
      font-size: 14px;
      font-weight: bold;
      line-height: 46px;
    }
    .notice {
      color: #c7c7c7;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 16px;
      margin-top: 4px;
      width: 100%;
    }
    .more {
      float: right;
    }
    .friend_photo {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        color: #262626;
        &:last-child {
          margin: 0;
        }
        span {
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
        }
        .follow {
          margin-left: 8px;
          color: #3897f0;
          white-space: nowrap;
        }
        .user {
          display: flex;
          flex: 1;
          overflow: hidden;
          .user-text {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            line-height: 18px;
            align-self: flex-start;
            overflow: hidden;
            .user-name {
              font-size: 14px;
              margin-top: -3px;
              a {
                color: black;
              }
            }
            .signature {
              color: #87939e;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
`
