import React from "react";
import ButtonPanel from "./ButtonPanel"
import fizzyBeats from "../logic/fizzyBeats";
import NumStepper from "./NumStepper"
import powerIcon from "./assets/power.png"
import "./Sequencer.css";


export default class Sequencer extends React.Component {

  beats = [];

  handleInput = (value) => {
    console.log(value);
  }

  sequenceButtonHandler = (row, col, selected) => {
    let btnInfo = {row: row, col: col, selected: selected};
    console.log(btnInfo);
    if (selected) {
      this.beats.push([row, col]);
    }
    else {
      for (var i = 0; i < this.beats.length; i++) {
        if (this.beats[i][0] === row && this.beats[i][1] === col) {
          this.beats.splice(i, 1);
        }
      }
    }
  }

  render() {
    return (
      <div className="component-app">
        <div className="content-wrapper">
          <div className="display-wrapper">
            <NumStepper inputHandler={this.handleInput} />
            <input type="image" src={powerIcon} className="on-button" />
          </div>
          <ButtonPanel clickHandler={this.sequenceButtonHandler} />
        </div>
      </div>
    );
  }
}
