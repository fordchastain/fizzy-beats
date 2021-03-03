import React from "react";
import PropTypes from "prop-types";
import "./NumStepper.css";

export default class Button extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    inputHandler: PropTypes.func,
  };

  state = {value: 120};

  handleInput = (event) => {
    this.props.inputHandler(event.target.value);
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <div className="component-num-stepper">
        <label>BPM:</label>
        <input type="number" id="bpm" name="bpm" min={this.props.min} 
          max={this.props.max} value={this.state.value} onInput={this.handleInput} />
      </div>
    );
  }
}