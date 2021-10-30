import styled from "styled-components";

export const GridLayout = styled.div`
  .react-resizable-handle {
    filter: invert(12%) sepia(73%) saturate(7233%) hue-rotate(359deg)
      brightness(112%) contrast(115%);
  }
  .react-grid-item.react-grid-placeholder {
    background: #696969;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .MenuButton {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding: 20px;
  }
`;

export const GridDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .Large {
    height: 100%;
    img {
      height: 100%;
    }
  }
`;
