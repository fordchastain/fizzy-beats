import React from "react";
import NumStepper from "./NumStepper"
import Button from "./Button"
import powerIcon from "./assets/power.png"
import presets from "./presets.json"
import AudioScheduler from "../logic/AudioScheduler"
import "./Sequencer.css";


export default class Sequencer extends React.Component {

  constructor(props) {
    super(props);

    this.audioScheduler = new AudioScheduler();

    this.state = {
      isPlaying: false,
      lastNoteDrawn: 7
    }
  }

  componentDidMount() {
    let samples = presets.drumKits[0].samples;
    for (var i = 0; i < samples.length; i++) {
      this.audioScheduler.setupSample(samples[i].url).then((sample) => {
        this.audioScheduler.samples.push(sample);
        console.log("sample loaded successfully");
      });
    }
  }

  drawButtons = () => {
    console.log("draw");
  }

  handleInput = (value) => {
    console.log("bpm changed to " + value);
    this.audioScheduler.bpm = value;
  }

  sequenceButtonHandler = (row, col) => {
    if (!col) {
      this.audioScheduler.playSample(this.audioScheduler.samples[row], 0);
    }
    else {
      console.log("sequence button at row " + row + " col pushed");
      var temp = this.audioScheduler.pads[row][col-1]; // use col-1 since first button isn't a sequence button
      this.audioScheduler.pads[row][col-1] = (temp === 0 ? 1 : 0);
    }
  }

  playButtonHandler = () => {
    this.setState({isPlaying: !this.state.isPlaying}, () => {
      if (this.state.isPlaying) {
        this.audioScheduler.start();
      }
      else {
        this.audioScheduler.stop();
      }
    });
  }

  render() {
    return (
      <div className="component-app">
        <div className="content-wrapper">
          <div className="display-wrapper">
            <NumStepper inputHandler={this.handleInput} />
            <input type="image" src={powerIcon} className="on-button" onClick={this.playButtonHandler}/>
          </div>
          <div className="button-panel">
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={0} col={8} />
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={1} col={8} />
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={2} col={8} />
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={3} col={8} />
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={4} col={8} />
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={0} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={1} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={2} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={3} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={4} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={5} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={6} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={7} />
              <Button handleClick={this.sequenceButtonHandler} row={5} col={8} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
