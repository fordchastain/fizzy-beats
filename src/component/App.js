import React from "react";
import ButtonPanel from "./ButtonPanel"
import NumStepper from "./NumStepper"
import "./App.css";

export default class App extends React.Component {

  handleInput = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className="component-app">
        <div className="content-wrapper">
          <NumStepper inputHandler={this.handleInput} />
          <ButtonPanel />
        </div>
      </div>
    );
  }
}
