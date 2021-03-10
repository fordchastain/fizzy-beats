import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    handleClick: PropTypes.func,
    playing: PropTypes.bool,
    currentBeat: PropTypes.number,
    sampleBtn: PropTypes.bool,
    text: PropTypes.string
  };

  state = {
    selected: false
  };

  handleClick = () => {
    if (!this.props.sampleBtn) {
      this.setState({selected: !this.state.selected});
    }

    this.props.handleClick(this.props.row, this.props.col, this.props.sampleBtn);
  };

  render() {
    const className = [
      "component-button",
      this.props.sampleBtn ? "sample" : "",
      this.state.selected ? "selected" : "",
      this.props.playing && this.props.col === this.props.currentBeat ? "playing " : ""
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}>{this.props.text}</button>
      </div>
    );
  }
}