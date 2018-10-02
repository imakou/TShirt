import React, { Component } from "react";
import { Text } from "react-konva";
import PropTypes from "prop-types";

class TextDisplaying extends Component {
  state = {
    text: null,
    txtPos: { x: 300, y: 300 },
    textColor: "black",
    edited: false
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.text !== prevState.text) {
      return { text: nextProps.text };
    } else if (nextProps.textColor !== prevState.textColor) {
      return { textColor: nextProps.textColor };
    }
    return null;
  }
  onDragEnd = () => {
    this.setState({
      edited: true
    });
  };
  onDragMove = env => {
    const txtPos = env.target._lastPos;
    this.setState({
      txtPos
    });
  };
  render() {
    const { txtPos } = this.state;
    const textSettings = {
      name: "Text",
      text: this.state.text,
      fill: this.state.textColor,
      onDragEnd: this.onDragEnd,
      onTransformEnd: this.onDragEnd,
      onDragMove: this.onDragMove,
      draggable: true,
      ...txtPos,
      ...(!this.state.edited && { scale: { x: 3, y: 3 } })
    };
    return <Text {...textSettings} />;
  }
}

TextDisplaying.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string
};

export default TextDisplaying;
