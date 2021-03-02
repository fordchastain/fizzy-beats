import Button from "./Button";
import React from "react";
import PropTypes from "prop-types";
import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = () => {

  };

  render() {
    return (
      <div className="component-button-panel">
        <div>
          <Button clickHandler={this.handleClick} sequenceButton rowNumber="0" columnNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="0" columnNumber="8"/>
        </div>
      </div>
    );
  }
}