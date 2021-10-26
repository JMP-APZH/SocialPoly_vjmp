import React from "react";
import logo from "../../Parrot.png";
import { GridDiv } from "./GridDNDStyle";

import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class GridDND extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 },
      rows: { lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 10,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={10}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <GridDiv
            key="1"
            data-grid={{ w: 8, h: 12, x: 0, y: 0, minW: 1, minH: 1 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
          <GridDiv
            key="2"
            data-grid={{ w: 8, h: 12, x: 8, y: 0, minW: 1, minH: 1 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
          <GridDiv
            key="3"
            data-grid={{ w: 8, h: 12, x: 16, y: 0, minW: 1, minH: 1 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
          <GridDiv
            key="4"
            data-grid={{ w: 8, h: 12, x: 24, y: 0, minW: 1, minH: 1 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
          <GridDiv
            key="5"
            data-grid={{ w: 8, h: 12, x: 32, y: 10, minW: 10, minH: 10 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
          <GridDiv
            key="6"
            data-grid={{ w: 8, h: 12, x: 40, y: 10, minW: 10, minH: 10 }}
          >
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </GridDiv>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../test-hook.jsx").then((fn) => fn.default(GridDND));
}
