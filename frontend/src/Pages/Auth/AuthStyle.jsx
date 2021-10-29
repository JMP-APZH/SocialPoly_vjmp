import styled from 'styled-components';
import * as global from '../../globalStyle'



export const AuthWrapper = styled.div`
    margin: calc(10vh) auto;
    width: 40%;
    height: 60vh;
    min-height: 390px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']} 2px solid;
    box-shadow: 0px 0px 10px ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']};

    form {
        flex-grow: 1;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        
        &>div {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            &>div {
                margin: 3%;
            }
            
        }
    }
    p {
        text-align: center;
    }
    .titleWrapper{
    }
    .inputWrapper {
        min-width: 400px;
        width: 50%;
    }
    .inputWrapper2 {
        min-width: 400px;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(2, 50%);
        flex-wrap: wrap;
        &>*:first-child {
            grid-column: 1/3;
            margin: 1.5%;
        }
        &>*{
            flex-grow: 1;
        }
    }
    .buttonWrapper {
    }
    h4 {
        font-size: 28px;

    }
`