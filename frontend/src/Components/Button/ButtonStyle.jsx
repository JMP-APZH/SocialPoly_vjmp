import styled from 'styled-components';
import * as global from '../../indexStyle'
import Button from '@mui/material/Button';

const buttonWidth = '200px'
const buttonHeight = '50px'

export const ButtonMain = styled(Button)`

    margin: 10px;
    width: ${buttonWidth};
    height: ${buttonHeight};
    border: solid 1px ${global.borderColor};
    box-shadow: 0px 0px 10px ${global.borderColor};
    border-radius: calc(${buttonHeight} / 2);
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : global.colorMain};
    ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : global.fontL};
    font-family: ${(props) => props.fontFamily ? props.fontFamily : global.openSans};
    font-weight: ${(props) => props.fontWeight ? props.fontWeight : 600};
    text-transform: uppercase;
    color: ${(props) => props.fontColor ? props.fontColor : 'white'};
    cursor: pointer;
    transition: .5s;
    
    &:hover {
        transition: .5s;
        filter: brightness(130%);
    }
`

export const ButtonMinor = styled(ButtonMain)`
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'white'};
    color: ${(props) => props.fontColor ? props.fontColor : '#525252'};

    &:hover {
        filter: brightness(90%);
    }
`