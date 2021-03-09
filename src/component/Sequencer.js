import React from "react";
import NumStepper from "./NumStepper"
import Button from "./Button"
import powerIcon from "./assets/power.png"
import presets from "./presets.json"
import "./Sequencer.css";


export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.pads = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.queue = [];
    this.samples = [];
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.lookAhead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.timerID = null;
    this.currentBeat = 0;
    this.nextBeatTime = 0.0;
    this.lastBeatDrawn = 7;

    this.state = {
      bpm: 120,
      isPlaying: false,
      drawBeat: 0
    }
  }

  componentDidMount() {
    let samples = presets.drumKits[0].samples;
    for (var i = 0; i < samples.length; i++) {
      this.setupSample(samples[i].url).then((sample) => {
        this.samples.push(sample);
        console.log("sample loaded successfully");
      });
    }
  }

  getFile = async (fp) => {
    const response = await fetch(fp);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  setupSample = async (url) => {
    const sample = await this.getFile(url);
    return sample;
  }

  playSample = (audioBuffer, time) => {
    const sampleSource = this.audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(this.audioContext.destination);
    sampleSource.start(time);
    return sampleSource;
  }

  nextBeat = () => {
    const secondsPerBeat = 60.0 / this.state.bpm / 4;
    this.nextBeatTime += secondsPerBeat;

    this.currentBeat++;
    if (this.currentBeat === 8) {
      this.currentBeat = 0;
    }
  }

  scheduleBeat = (beatNumber, time) => {
    this.queue.push({beat: beatNumber, time: time});

    for (var i = 0; i < this.pads.length; i++) {
      if (this.pads[i][beatNumber]) {
        this.playSample(this.samples[i], time);
      }
    }
  }

  scheduler = () => {
    while (this.nextBeatTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleBeat(this.currentBeat, this.nextBeatTime);
      this.nextBeat();
    }

    this.timerID = window.setTimeout(this.scheduler, this.lookAhead);
  }

  start() {
    if (this.audioContext === 'suspended') {
      this.audioContext.resume();
    }

    this.currentBeat = 0;
    this.nextBeatTime = this.audioContext.currentTime;
    this.scheduler();
    requestAnimationFrame(this.draw);
  }

  stop() {
    window.clearTimeout(this.timerID);
  }

  draw = () => {
    let drawBeat = this.lastBeatDrawn;
    const currentTime = this.audioContext.currentTime;

    while (this.queue.length && this.queue[0].time < currentTime) {
      drawBeat = this.queue[0].beat;
      this.queue.splice(0, 1);
    }

    if (this.lastBeatDrawn !== drawBeat) {
      this.setState({drawBeat: drawBeat});

      this.lastBeatDrawn = drawBeat;
    }

    requestAnimationFrame(this.draw);
  }

  handleInput = (value) => {
    console.log("bpm changed to " + value);
    this.setState({bpm: value});
  }

  sequenceButtonHandler = (row, col, sampleBtn) => {
    if (sampleBtn) {
      this.playSample(this.samples[row], 0);
    }
    else {
      console.log("sequence button at row " + row + " col pushed");
      var temp = this.pads[row][col]; // use col-1 since first button isn't a sequence button
      this.pads[row][col] = (temp === 0 ? 1 : 0);
    }
  }

  playButtonHandler = () => {
    this.setState({isPlaying: !this.state.isPlaying}, () => {
      if (this.state.isPlaying) {
        this.start();
      }
      else {
        this.stop();
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
              <Button handleClick={this.sequenceButtonHandler} row={0} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={0} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={1} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={1} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={2} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={2} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={3} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={3} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={4} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={4} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
            <div>
              <Button handleClick={this.sequenceButtonHandler} row={5} sampleBtn/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={0} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={1} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={2} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={3} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={4} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={5} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={6} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
              <Button handleClick={this.sequenceButtonHandler} row={5} col={7} playing={this.state.isPlaying} currentBeat={this.state.drawBeat}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
