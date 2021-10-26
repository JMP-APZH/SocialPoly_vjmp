import styled from 'styled-components';
import * as global from '../../indexStyle'
import { TextField } from '@mui/material';



export const PostTextArea = styled(TextField)`
    && {
        border-radius: 4px;
        outline: none;
        resize: none;
        width: 80%;
        box-shadow: 0px 0px 10px ${global.borderColor};
        ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : global.fontM};
        font-family: ${(props) => props.fontFamily ? props.fontFamily : global.openSans};
        color: blue;
    }
`

export const PostCreationWrapper = styled.div`
    
    
    .postWrapper {
        border: crimson 2px solid;
        width: 60%;
        display: flex;
        unicode-bidi:bidi-override;

    }
    
    .postContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        margin: 15px ;

        textarea {
            ${(props) => props.remainingText < 0 ? 'color: red' : 'color: black'}
        }
        span {
            margin-top: 10px;
            ${(props) =>
            props.remainingText > 30 ? 'color: green;' :
            props.remainingText > 10 ? 'color: orange' :
            props.remainingText >= 0 ? 'color: red' :
            'color: red; font-weight: bold'
            }
        }
        
    }

    .platformButtons {
        display: flex;
        flex-direction: row;
    }
    
    .postControls {
        margin: 0 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }
    `

export const PlatformButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    margin: 10px;
    height: 40px;
    width: 40px;
    border: solid 1px ${global.borderColor};
    box-shadow: 0px 0px 10px ${global.borderColor};
    cursor: pointer;
    ${(props) => props.active ? `background-color: ${global.colorMainL};` : `background-color: lightgray;`}
    transition: .5s;
    
    &:hover {
        filter: brightness(90%);
    }
    &:disabled {
        cursor: not-allowed;
    }
    
    img {
        ${(props) => props.active ? `filter: invert(100%);` : ``}
        height: 70%;
        width: 70%;
    }
    
`