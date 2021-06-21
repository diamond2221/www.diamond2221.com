import styled from 'styled-components'

/*
 * @Author: ZhangYu
 * @Date:   2020-02-20
 * @Last Modified by: zhangyu
 * @Last Modified time: 2021-06-21 18:06:32
 */

export const NewPostModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.75);
  .send-post-content {
    position: relative;
    z-index: 2;
    background-color: #fff;
    width: 450px;
    overflow: hidden;
    margin: 60px auto;
    border: 1px solid #dbdbdb;
    border-radius: 8px;

    .user-info {
      display: flex;
      padding: 8px 15px;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 12px;
        a {
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
      }
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

    .post-imgs {
      .image-list {
        height: 300px;
        width: 100%;
      }
      .upload-style {
        width: 100%;
        border-style: dashed none;
        border-width: 2px;
        border-color: #cfcfcf;
        background: #f2f2f2;
      }
      .image-upload {
        width: 100%;
        height: 196px;
        display: flex;
        justify-content: row;
        .upload-btns:first-child::after {
          content: '';
          position: absolute;
          right: 0;
          height: 80%;
          width: 1px;
          background: #b5b3b3;
        }
        .upload-btns {
          position: relative;
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #989898;
          font-size: 14px;
          cursor: pointer;
          .icon {
            display: inline-block;
            height: 40px;
            width: 40px;
            background-size: 100% 100%;
            cursor: pointer;
          }
          .local-upload {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            cursor: pointer;
            span {
              width: 100%;
              height: 100%;
              display: flex;
              .ant-upload {
                display: block !important;
                width: 100%;
                height: 100%;
              }
            }
          }
          .camera {
            background-image: url('../../assets/image/local-upload.png');
          }
          .network {
            background-image: url('../../assets/image/network-upload.png');
          }
        }
      }

      .placeholder {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
      }

      .input-url {
        position: relative;
        height: 36px;
        &:hover .close-circle {
          display: inline-block;
        }
        .close-circle {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          height: 20px;
          width: 20px;
        }
        .notice {
          &:hover .close-circle {
            display: inline-block;
          }
          position: relative;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          color: #989898;
          cursor: pointer;
          .icon {
            display: inline-block;
            height: 24px;
            width: 24px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/network-upload.png');
          }
        }
        .input-container {
          height: 100%;
          width: 100%;
          input {
            padding-left: 20px;
            padding-right: 35px;
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
          }
        }
      }
    }
    .descript {
      padding: 20px;
      border-bottom: 1px solid rgb(223, 222, 222);
      textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      span {
        height: 30px;
        width: 42px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
      .close {
        margin-left: 20px;
        background-color: #9da6af;
      }
      .post {
        margin-right: 20px;
        background-color: #529ecc;
      }
    }

    .send-post {
      display: flex;
      border-bottom: 1px solid #ccc;
      background: #fff;
      padding: 13px;
      box-sizing: border-box;
      .post-user {
        padding: 12px 0px;
        width: 62px;
        .img {
          margin: 0 auto;
          width: 37px;
          height: 37px;
          border: 1px solid #ccc;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            // background-color: red;
          }
        }
      }
      .message-input {
        flex: 1;
        margin: 23px 23px 13px 0px;
        display: flex;
        align-items: center;
        textarea {
          min-height: 34px;
          width: 100%;
          height: 34px;
          overflow: hidden;
          padding: 5px 10px;
          margin: 0;
          resize: none;
          line-height: 24px;
          font-size: 16px;
          border: none;
          outline: none;
          border-radius: 3px;
          box-sizing: border-box;
          transition: height 200ms linear;
          color: black;
          display: block;
        }
        .face-img {
          display: inline-block;
          width: 23px;
          height: 22px;
          align-self: flex-end;
          background: url('../../assets/image/sprite3.png') no-repeat -167px -254px;
          position: relative;
          cursor: pointer;
          &:hover {
            background-position: -142px -254px;
          }
          ul {
            position: absolute;
            right: -20px;
            top: 30px;
            display: grid;
            grid-template-columns: repeat(7, 1.5fr);
            grid-gap: 5px;
            padding: 10px;
            margin: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            z-index: 10;
            display: none;
          }
        }
      }
    }
    .post-img {
      padding: 13px;
      display: flex;
      /deep/ .ant-upload-picture-card-wrapper {
        display: flex;
        flex-wrap: wrap;
        /deep/ .ant-upload {
          display: flex;
          float: none;
          /deep/ span {
            /deep/ div {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
      }
    }
  }
`
