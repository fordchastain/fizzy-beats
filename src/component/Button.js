import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
    selected: PropTypes.bool,
    sequenceButton: PropTypes.bool,
    rowNumber: PropTypes.number,
    colNumber: PropTypes.number
  };

  handleClick = () => {
    if (!this.sequenceButton) {

    }
    else {
      this.selected = !this.selected;
    }
  };

  render() {
    const className = [
      "component-button",
      this.props.sequenceButton ? "sequence" : "",
      this.props.selected ? "selected" : ""
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}></button>
      </div>
    );
  }
}