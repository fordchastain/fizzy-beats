import React from "react";
import ButtonPanel from "./ButtonPanel"
import fizzyBeats from "../logic/fizzyBeats";
import NumStepper from "./NumStepper"
import powerIcon from "./assets/power.png"
import "./App.css";


export default class App extends React.Component {

  handleInput = (value) => {
    console.log(value);
  }

  sequenceButtonHandler = (row, col, selected) => {
    let btnInfo = {row: row, col: col, selected: selected};
    console.log(btnInfo);
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
