import styled from 'styled-components';
import * as global from '../../indexStyle'
import Button from '@mui/material/Button';

export const TestButton = styled(Button)`
    background-color: red;
`

export const PostCreationWrapper = styled.div`

    .postWrapper {
        display: flex;
    }
    
    .postContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        input {
            margin: 10px 0;
        }
        
        textarea {
            border: gray 1px solid;
            border-radius: 4px;
            outline: none;
            resize: none;
            padding: 10px;
            border: solid 1px ${global.borderColor};
            box-shadow: 0px 0px 10px ${global.borderColor};
            ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : global.fontM};
            font-family: ${(props) => props.fontFamily ? props.fontFamily : global.openSans}
        }
    }
    .postControls {
        margin: 0 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }
`