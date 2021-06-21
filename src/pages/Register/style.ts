import styled from 'styled-components'
import SpriteImg from '../../assets/image/sprite.png'

/*
* @Author: ZhangYu
* @Date:   2018-12-26 21:55:58
 * @Last Modified by: zhangyu
 * @Last Modified time: 2021-06-17 17:33:51
*/
export const RegisterWrapper = styled.div`
    margin-top: 80px;
    text-align: center;
    .ant-card {
        width: 350px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    .ant-card:first-child {
        .ant-card-body {
            padding: 40px 35px 25px;
            .logo-img {
                margin: 0 auto 10px;
                background: url(${SpriteImg}) no-repeat 0px -96.5px;
                width: 149px;
                height: 50px;
                background-size: 495px 483px;
            }
            h3 {
                font-size: 18px;
                color: #989898;
                font-weight: bold;
                padding: 15px 0px;
            }
            .ant-form-item {
                margin-bottom: 10px;
            }
            .ant-form-explain {
                transition: all 300ms;
            }
            .ant-btn {
                width: 100%;
                margin-bottom: 15px;
            }
            .lines {
                position: relative;
                display: flex;
                padding: 15px;
                margin-bottom: 10px;
                justify-content: center;
                .line {
                    height: 1px;
                    background-color: #ccc;
                    width: 40%;
                }
                .or {
                    color: #999;
                    font-size: 12px;
                    height: 1px;
                    line-height: 1px;
                    margin: 0px 10px;
                }
            }
            .re-sendSms {
                button {
                    color: #3897EE;
                    font-weight: bold;
                }
            }
        }
    }
    .ant-card:last-child {
        margin-bottom: 0;
        .ant-card-body {
            padding: 10px;
            p {
                margin-bottom: 0;
            }
        }
    }
`
