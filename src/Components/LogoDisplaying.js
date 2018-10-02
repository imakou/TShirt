import React, { Component } from "react";
import Konva from "konva";
import { Image } from "react-konva";
import PropTypes from "prop-types";

class LogoDisplaying extends Component {
  state = {
    image: undefined,
    logoEffects: undefined,
    imgPos: { x: 300, y: 300 },
    edited: false
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const image = new window.Image();
    const { imgSrc, logoEffects } = nextProps;
    image.src = imgSrc;
    return { image, logoEffects };
  }
  componentDidMount() {
    this.renderIMG();
  }
  componentDidUpdate(prevProps, prevState) {
    this.myImage.cache();
    this.myImage.getLayer().draw();
  }
  renderIMG() {
    const image = new window.Image();
    image.src = this.state.image;
    image.onload = () => {
      this.setState(
        {
          image
        },
        () => {
          this.myImage.cache();
          this.myImage.getLayer().draw();
        }
      );
    };
  }

  onDragEnd = () => {
    this.setState({
      edited: true
    });
  };

  onDragMove = env => {
    const imgPos = env.target._lastPos;
    this.setState({
      imgPos
    });
  };

  render() {
    const { imgPos, logoEffects } = this.state;
    const filters =
      logoEffects === "grayScale"
        ? [Konva.Filters.Grayscale]
        : logoEffects === "sepia"
          ? [Konva.Filters.Sepia]
          : null;
    const imageSettings = {
      filters,
      name: "Logo",
      image: this.state.image,
      onDragEnd: this.onDragEnd,
      onTransformEnd: this.onDragEnd,
      onDragMove: this.onDragMove,
      draggable: true,
      ...imgPos,
      ...(!this.state.edited && { scale: { x: 0.5, y: 0.5 } })
    };

    return (
      <Image
        {...imageSettings}
        ref={node => {
          this.myImage = node;
        }}
      />
    );
  }
}

LogoDisplaying.propTypes = {
  imgSrc: PropTypes.string,
  logoEffects: PropTypes.string
};

export default LogoDisplaying;
