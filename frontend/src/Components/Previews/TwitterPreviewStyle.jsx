import styled from 'styled-components';
import * as global from '../../indexStyle';

export const TwitterPreviewWrapper = styled.div`

    .twitterPostWrapper {
        display: flex;
        flex-direction: column;
        
        box-sizing: border-box;
        width: 600px;
        border: #EFF3F4 1px solid;
        
        .postHeader {
            display: flex;
            flex-direction: row;
        }
        .nameWrapper {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;

            h6 {
                font-family: ${global.openSans};
                font-size: 15px;
            }
            span {
                font-family: ${global.openSans};
                font-size: 15px;
                margin-bottom: 7px;
                color: gray;
            }
        }
        .profileIcon {
            height: 48px;
            width: 48px;
            border-radius: 50%;
            object-fit: cover;
        }
        button {
            width: 35px;
            height: 35px;
            border: none;
            background-color: transparent;
            filter: invert(37%) sepia(5%) saturate(1627%) hue-rotate(164deg) brightness(96%) contrast(87%);
        }
    }
`