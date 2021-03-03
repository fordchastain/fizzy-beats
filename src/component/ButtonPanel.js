import Button from "./Button";
import React from "react";
import PropTypes from "prop-types";
import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = (row, col, selected) => {
    this.props.clickHandler(row, col, selected);
  };

  render() {
    return (
      <div className="component-button-panel">
        <div>
          <Button clickHandler={this.handleClick} row={0} col={0}/>
          <Button clickHandler={this.handleClick} row={0} col={1}/>
          <Button clickHandler={this.handleClick} row={0} col={2}/>
          <Button clickHandler={this.handleClick} row={0} col={3}/>
          <Button clickHandler={this.handleClick} row={0} col={4}/>
          <Button clickHandler={this.handleClick} row={0} col={5}/>
          <Button clickHandler={this.handleClick} row={0} col={6}/>
          <Button clickHandler={this.handleClick} row={0} col={7}/>
          <Button clickHandler={this.handleClick} row={0} col={8}/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} row={1} col={0}/>
          <Button clickHandler={this.handleClick} row={1} col={1}/>
          <Button clickHandler={this.handleClick} row={1} col={2}/>
          <Button clickHandler={this.handleClick} row={1} col={3}/>
          <Button clickHandler={this.handleClick} row={1} col={4}/>
          <Button clickHandler={this.handleClick} row={1} col={5}/>
          <Button clickHandler={this.handleClick} row={1} col={6}/>
          <Button clickHandler={this.handleClick} row={1} col={7}/>
          <Button clickHandler={this.handleClick} row={1} col={8}/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} row={2} col={0}/>
          <Button clickHandler={this.handleClick} row={2} col={1}/>
          <Button clickHandler={this.handleClick} row={2} col={2}/>
          <Button clickHandler={this.handleClick} row={2} col={3}/>
          <Button clickHandler={this.handleClick} row={2} col={4}/>
          <Button clickHandler={this.handleClick} row={2} col={5}/>
          <Button clickHandler={this.handleClick} row={2} col={6}/>
          <Button clickHandler={this.handleClick} row={2} col={7}/>
          <Button clickHandler={this.handleClick} row={2} col={8}/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} row={3} col={0}/>
          <Button clickHandler={this.handleClick} row={3} col={1}/>
          <Button clickHandler={this.handleClick} row={3} col={2}/>
          <Button clickHandler={this.handleClick} row={3} col={3}/>
          <Button clickHandler={this.handleClick} row={3} col={4}/>
          <Button clickHandler={this.handleClick} row={3} col={5}/>
          <Button clickHandler={this.handleClick} row={3} col={6}/>
          <Button clickHandler={this.handleClick} row={3} col={7}/>
          <Button clickHandler={this.handleClick} row={3} col={8}/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} row={4} col={0}/>
          <Button clickHandler={this.handleClick} row={4} col={1}/>
          <Button clickHandler={this.handleClick} row={4} col={2}/>
          <Button clickHandler={this.handleClick} row={4} col={3}/>
          <Button clickHandler={this.handleClick} row={4} col={4}/>
          <Button clickHandler={this.handleClick} row={4} col={5}/>
          <Button clickHandler={this.handleClick} row={4} col={6}/>
          <Button clickHandler={this.handleClick} row={4} col={7}/>
          <Button clickHandler={this.handleClick} row={4} col={8}/>
        </div>
        <div>
          <Button clickHandler={this.handleClick} row={5} col={0}/>
          <Button clickHandler={this.handleClick} row={5} col={1}/>
          <Button clickHandler={this.handleClick} row={5} col={2}/>
          <Button clickHandler={this.handleClick} row={5} col={3}/>
          <Button clickHandler={this.handleClick} row={5} col={4}/>
          <Button clickHandler={this.handleClick} row={5} col={5}/>
          <Button clickHandler={this.handleClick} row={5} col={6}/>
          <Button clickHandler={this.handleClick} row={5} col={7}/>
          <Button clickHandler={this.handleClick} row={5} col={8}/>
        </div>
      </div>
    );
  }
}