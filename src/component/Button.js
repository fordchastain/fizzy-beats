import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    handleClick: PropTypes.func,
  };

  state = {
    selected: false,
    playing: false
  };

  handleClick = () => {
    if (this.props.col!=0) {
      this.setState({selected: !this.state.selected});
    }

    this.props.handleClick(this.props.row, this.props.col, !this.state.selected);
  };

  render() {
    const className = [
      "component-button",
      this.props.col==0 ? "sequence" : "",
      this.state.selected ? "selected" : "",
      this.state.playing ? "playing " : ""
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}></button>
      </div>
    );
  }
}