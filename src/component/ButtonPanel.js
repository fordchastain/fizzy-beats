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
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="0" coNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="0" colNumber="8"/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="1" colNumber="8"/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="2" colNumber="8"/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="3" colNumber="8"/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="4" colNumber="8"/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="0"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="1"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="2"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="3"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="4"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="5"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="6"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="7"/>
          <Button clickHandler={this.handleClick} rowNumber="5" colNumber="8"/>
        </div>
      </div>
    );
  }
}