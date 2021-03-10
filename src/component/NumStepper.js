import React from "react";
import PropTypes from "prop-types";
import "./NumStepper.css";

export default class Button extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    changeHandler: PropTypes.func,
    label: PropTypes.string,
    defaultVal: PropTypes.number,
    value: PropTypes.string
  };

  handleChange = (event) => {
    this.props.changeHandler(event.target.value);
  };

  render() {
    return (
      <div className="component-num-stepper">
        <label>{this.props.label}</label>
        <input type="number" id="bpm" name="bpm" min={this.props.min}
          max={this.props.max} value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}