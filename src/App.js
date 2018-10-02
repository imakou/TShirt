import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";
import "./App.css";
import DesignBar from "./Components/DesignBar";
import TransformerComponent from "./Components/TransformerComponent";
import LogoDisplaying from "./Components/LogoDisplaying";
import TextDisplaying from "./Components/TextDisplaying";

class App extends Component {
  state = {
    prodSrc: undefined,
    prodType: "T-Shirt",
    imgSrc: undefined,
    text: undefined,
    addPrice: 0,
    material: undefined,
    textColor: "black",
    prodColor: undefined,
    basePrice: 0,
    logoEffects: "default",
    selectedShapeName: undefined,
    base64File: undefined
  };

  componentDidMount() {
    this.setProdMainImg("/ts-w.png");
    this.renderProduct();
  }

  setProdSrc = prodUrl => {
    this.setProdMainImg(prodUrl);
  };
  setProdMainImg = imgSrc => {
    const prodSrc = new window.Image();
    prodSrc.src = require(`./images${imgSrc}`);
    prodSrc.onload = () => {
      this.setState({
        prodSrc
      });
    };
  };
  setText = text => {
    this.setState({
      text
    });
  };

  setMaterial = (prodMaterial, addPrice) => {
    this.setState({
      prodMaterial,
      addPrice
    });
  };

  setColor = (prodColor, basePrice) => {
    this.setState({
      prodColor,
      basePrice
    });
  };

  setProdType = prodType => {
    const defaultPic = {
      "T-Shirt": "/ts-w.png",
      Sweater: "/st-w.png"
    };
    this.setState(
      {
        prodType
      },
      () => {
        this.setProdMainImg(defaultPic[prodType]);
      }
    );
  };

  setLogoEffects = logoEffects => {
    this.setState({
      logoEffects,
      ...(logoEffects === "noImg" && { imgSrc: "", logoEffects: "default" })
    });
  };

  setTextColor = textColor => {
    this.setState({
      textColor
    });
  };

  setLogo = imgSrc => {
    this.setState({
      imgSrc
    });
  };
  handleExportClick = () => {
    const base64File = this.stageRef.getStage().toDataURL();
    this.setState({
      base64File
    });
  };
  renderProduct = () => {
    return <Image className="img-fluid" draggable image={this.state.prodSrc} />;
  };
  calculatteSum = () => {
    const { basePrice, addPrice, text, textColor, imgSrc } = this.state;
    const price = basePrice + addPrice;
    const txtFee = !text ? 0 : ["black", "white"].indexOf(textColor) !== -1 ? 0 : 3;
    const logoFee = !imgSrc ? 0 : 10;
    return price + txtFee + logoFee;
  };
  handleStageMouseDown = e => {
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    const clickedOnTransformer = e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();

    if (name) {
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
              <Stage
                width={800}
                height={800}
                onMouseDown={this.handleStageMouseDown}
                ref={node => {
                  this.stageRef = node;
                }}
              >
                <Layer>
                  {this.renderProduct()}
                  {this.state.imgSrc ? (
                    <LogoDisplaying
                      imgSrc={this.state.imgSrc}
                      logoEffects={this.state.logoEffects}
                    />
                  ) : null}
                  {this.state.text ? (
                    <TextDisplaying
                      text={this.state.text}
                      textColor={this.state.textColor}
                    />
                  ) : null}

                  <TransformerComponent
                    selectedShapeName={this.state.selectedShapeName}
                  />
                </Layer>
              </Stage>
            </div>
            <div className="col-md-4">
              <DesignBar
                setProdType={this.setProdType}
                setProdSrc={this.setProdSrc}
                setLogo={this.setLogo}
                setText={this.setText}
                setColor={this.setColor}
                setMaterial={this.setMaterial}
                setTextColor={this.setTextColor}
                setLogoEffects={this.setLogoEffects}
                handleExportClick={this.handleExportClick}
                calculatteSum={this.calculatteSum}
                imageUrl={this.state.imageUrl}
                base64File={this.state.base64File}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
