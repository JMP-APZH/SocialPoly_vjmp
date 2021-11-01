import styled from "styled-components";
import * as global from "../../globalStyle";
import { TextField } from "@mui/material";
import UploadIcon from "../../assets/svgs/upload-icon.svg";

export const PostTextArea = styled(TextField)`
  && {
    border-radius: 4px;
    outline: none;
    resize: none;
    width: 80%;
    ${(props) => props.fontSize ? "font-size: " + props.fontSize : global.fontM};
    /* box-shadow: 0px 0px 10px ${global.borderColor}; */
    font-family: ${(props) =>
      props.fontFamily ? props.fontFamily : global.openSans};
  }
`;

export const PostCreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: auto;
  overflow: wrap;

  border: ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']} 2px solid;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']};
  max-width: 60%;
  min-width: 600px;
  display: flex;


  .postWrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 20px;
    overflow: wrap;
    flex-wrap: wrap;
    align-items: center;
  }

  .fileDropWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 200px;
  }

  .postContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;


    textarea {
        ${(props) => (props.remainingText < 0 ? "color: red" : "color: inherit")};
    }
    span {
      margin-top: 10px;
      ${(props) =>
        props.remainingText > 30
          ? "color: green;"
          : props.remainingText > 10
          ? "color: orange"
          : props.remainingText >= 0
          ? "color: red"
          : "color: red; font-weight: bold"}
    }
  }

  .platformButtons {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    button {
        border: solid 1px ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.grey['700'] : props.theme.palette.grey['300']};
        box-shadow: 0px 0px 10px ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.grey['700'] : props.theme.palette.grey['300']};
    }
  }

  .postControls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .previewWrapper {
      margin: 30px 0;
      width: 100%;
      padding: 10px;
      box-sizing: content-box;
      border: ${global.colorMain} solid 2px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px ${global.colorMainD};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .previewTitle {
  }
  .previewDisplay {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: content-box;
      
      &>button {
          width: 5%;
          box-sizing: border-box;
          cursor: pointer;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${(props) => (props.theme.palette.mode === 'dark' ? '#3F9FE730' : '#0260b230')};
          
          &:hover{
              background-color: ${(props) => (props.theme.palette.mode === 'dark' ? '#3f9ee760' : '#0260b260')};
          }
          &:disabled {
              cursor: not-allowed;
          }
      }
      .forwardArrowButton {
          margin-left: 5px;
      }
      .backArrowButton {
          margin-right: 5px;
      }
  }
  margin-bottom: 200px;
`;

export const FileDrop = styled.div`
display: flex;
height: 80px;
width: 400px;
border: ${global.borderColor} 3px ${(props) => (props.dragover ? "dashed" : "solid")};
border-radius: 8px;
flex-grow: 1;

  div {
    display: ${(props) => (props.dragover ? "none" : "flex")};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  .fileDrop {
    background-color: ${global.colorMainL};
  }
  .dragOverlay {
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    display: ${(props) => (props.dragover ? "flex" : "none")};
    background-image: url(${UploadIcon});
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;

  }
`;

export const PlatformButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  margin: 10px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `background-color: ${global.colorMainL};`
      : `background-color: lightgray;`}
  transition: .5s;

  &:hover {
    filter: brightness(90%);
  }
  &:disabled {
    cursor: not-allowed;
  }

  img {
    ${(props) => (props.active ? `filter: invert(100%);` : ``)}
    height: 70%;
    width: 70%;
  }
`;
