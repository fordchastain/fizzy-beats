import React from "react";
import PropTypes from "prop-types";
import "./NumStepper.css";

export default class Button extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    inputHandler: PropTypes.func,
    label: PropTypes.string,
    defaultVal: PropTypes.number
  };

  state = {value: this.props.defaultVal};

  handleInput = (event) => {
    this.props.inputHandler(event.target.value);
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <div className="component-num-stepper">
        <label>{this.props.label}</label>
        <input type="number" id="bpm" name="bpm" min={this.props.min} 
          max={this.props.max} value={this.state.value} onInput={this.handleInput} />
      </div>
    );
  }
}