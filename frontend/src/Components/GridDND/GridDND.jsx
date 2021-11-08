import React from "react";
import logo from "../../Parrot.png";
import { GridLayout, GridDiv } from "./GridDNDStyle";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Fab } from "@mui/material";
import { Edit, EditOff } from "@mui/icons-material";
import PostCreation from "../PostCreation/PostCreation";
import TwitterLikes from '../Analytics/TwitterLikes';
import DraftPlatforms from '../Analytics/DraftPlatforms';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

export default class GridDND extends React.PureComponent {
    
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      editGrid: false
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

  onResize = (layouts) => {
    this.setState({
      layout: layouts,
    });
  };

  toggleEditGrid = () => {
    this.setState({
      editGrid: !this.state.editGrid,
    });
  };

  render() {
    return (
      <GridLayout layout>
        <div>
          <Fab
            color="primary"
            onClick={this.toggleEditGrid}
            style={{
              zIndex: "100",
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            {this.state.editGrid ? (
              <EditOff className="Icon" />
            ) : (
              <Edit className="Icon" />
            )}
          </Fab>
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          id="Resizable"
          cols={{ lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={10}
          onResize={this.onResize}
          layouts={this.state.layouts}
          isResizable={this.state.editGrid}
          isDraggable={this.state.editGrid}
          isRearrangeable={this.state.editGrid}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <GridDiv key="1" data-grid={{ w: 18, h: 12, x: 0, y: 0 }}>
            <span className="Large" id="postCreation">
              <PostCreation />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="2" data-grid={{ w: 8, h: 12, x: 8, y: 0 }}>
            <span className="Large">
              <TwitterLikes />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="3" data-grid={{ w: 8, h: 12, x: 16, y: 0 }}>
            <span className="Large">
              <DraftPlatforms />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="4" data-grid={{ w: 8, h: 12, x: 24, y: 0 }}>
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="5" data-grid={{ w: 8, h: 12, x: 32, y: 0 }}>
            <span className="Large">
              <img src={logo} className="App-logo" alt="logo" />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
        </ResponsiveReactGridLayout>
      </GridLayout>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {}
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
