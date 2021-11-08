import styled from "styled-components";
import * as global from "../../globalStyle";

export const CustomToolTipWrapper = styled.div`
    ${global.test}
    border: ${global.colorMain} 2px solid;
    border-radius: 4px;
    box-shadow: 2px 2px 5px ${global.borderColor};
    background-color: #c9e0e7;
    padding: 5px;
`

export const GraphWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: auto;
    ${global.test}
`