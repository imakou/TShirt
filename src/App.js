import React, { Component } from "react";
import Konva from "konva";
import { Stage, Layer, Image, Text } from "react-konva";
import "./App.css";
import DesignBar from "./Components/DesignBar";
import Product from "./images/ts-w.png";
import TransformerComponent from "./Components/TransformerComponent";
class App extends Component {
  state = {
    prodSrc: undefined,
    imgSrc: undefined,
    Text: undefined,
    selectedShapeName: undefined
  };

  componentDidMount() {
    const prodSrc = new window.Image();
    prodSrc.src = Product;
    prodSrc.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        prodSrc
      });
    };
    this.renderProduct();
  }

  setText = Text => {
    this.setState({
      Text
    });
  };

  setLogo = imgSrc => {
    this.setState({
      imgSrc
    });
  };

  setProduct = value => {
    console.log("Hello value", value);
  };

  renderProduct = prod => {
    return <Image className="img-fluid" draggable image={this.state.prodSrc} />;
  };

  renderLogo = () => {
    const image = new window.Image();
    image.src = this.state.imgSrc;
    image.onload = () => {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    };
    return (
      <Image
        filters={[Konva.Filters.Grayscale]}
        ref={node => {
          this.myImage = node;
        }}
        name={"Logo"}
        onTransform={r => console.log(r)}
        draggable
        image={image}
      />
    );
  };

  renderText = () => {
    const { Text: text } = this.state;
    return <Text name={"Text"} onTransform={r => console.log(r)} draggable text={text} />;
  };

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = "Logo";
    // const rect = this.state.rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Stage width="800" height="800" onMouseDown={this.handleStageMouseDown}>
                <Layer>{this.renderProduct()}</Layer>
                {this.state.imgSrc ? (
                  <Layer>
                    {this.renderLogo()}
                    <TransformerComponent selectedShapeName={this.state.selectedShapeName} />
                  </Layer>
                ) : null}
                {this.state.Text ? (
                  <Layer>
                    {this.renderText()}
                    <TransformerComponent selectedShapeName={this.state.selectedShapeName} />
                  </Layer>
                ) : null}
              </Stage>
            </div>
            <div className="col-md-4">
              <DesignBar setLogo={this.setLogo} setText={this.setText} setProduct={this.setProduct} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
