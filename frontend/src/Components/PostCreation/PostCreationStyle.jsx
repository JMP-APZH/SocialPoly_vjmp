import styled from "styled-components";
import * as global from "../../indexStyle";
import { TextField } from "@mui/material";

export const PostTextArea = styled(TextField)`
  && {
    border-radius: 4px;
    outline: none;
    resize: none;
    width: 80%;
    box-shadow: 0px 0px 10px ${global.borderColor};
    ${(props) =>
      props.fontSize ? "font-size: " + props.fontSize : global.fontM};
    font-family: ${(props) =>
      props.fontFamily ? props.fontFamily : global.openSans};
  }
`;

export const PostCreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: ${global.borderColor} 2px solid;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px ${global.borderColor};
  width: 60%;
  display: flex;
  overflow: auto;

  .postWrapper {
    width: 100%;
    display: flex;
    overflow: auto;
  }

  .postContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin: 15px;

    textarea {
      ${(props) => (props.remainingText < 0 ? "color: red" : "color: black")}
      color: inherit;
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
  }

  .postControls {
    margin: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .previewWrapper {
    border: ${global.colorMain} solid 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px ${global.colorMainD};
  }
  margin-bottom: 200px;
`;

export const FileDropWrapper = styled.div`
  display: flex;
  height: 80px;
  width: 400px;
  /* background-color: ${(props) => (props.dragover ? "blue" : "coral")}; */
  border: ${global.borderColor} 3px
    ${(props) => (props.dragover ? "dashed" : "solid")};
  border-radius: 8px;

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
  border: solid 1px ${global.borderColor};
  box-shadow: 0px 0px 10px ${global.borderColor};
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
