import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    rowNumber: PropTypes.number,
    colNumber: PropTypes.number
  };

  state = {selected: false};

  handleClick = () => {
    if (this.props.colNumber!=0) {
      this.setState({selected: !this.state.selected});
    }
  };

  render() {
    const className = [
      "component-button",
      this.props.colNumber==0 ? "sequence" : "",
      this.state.selected ? "selected" : ""
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}></button>
      </div>
    );
  }
}