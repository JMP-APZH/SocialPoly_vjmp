import styled from "styled-components";

export const TopBarMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 4vw;
  max-height: 60px;
  background-color: #fff;
  .TopLeft {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      height: min(3vw, 58px);
      cursor: pointer;
    }
  }
  .TopRight {
    display: flex;
    justify-content: center;
    align-items: center;
    .NotificationContainer {
      display: flex;
      background-color: pink;
    }
    .NotificationCounter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      background-color: red;
      color: white;
      border-radius: 50%;
      font-size: min(1vw, 15px);
    }
  }
  .Icon {
    cursor: pointer;
  }
`;
