import React from "react";
import NumStepper from "./NumStepper"
import Button from "./Button"
import powerIcon from "./assets/power.svg"
import presets from "./presets.json"
import "./Sequencer.css";


export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.pads = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    //this.samples = [];
    this.queue = [];
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.lookAhead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.timerID = null;
    this.currentBeat = 0;
    this.nextBeatTime = 0.0;
    this.lastBeatDrawn = 15;

    this.state = {
      bpm: 100,
      isPlaying: false,
      drawBeat: 0,
      samples: []
    }
  }

  componentDidMount() {
    let samples = presets.drumKits[0].samples;
    for (var i = 0; i < samples.length; i++) {
      this.setupSample(samples[i]).then((sample) => {
        this.setState({samples: [...this.state.samples, {sample: sample.sample, name: sample.name}] });
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

  setupSample = async (src) => {
    const sample = await this.getFile(src.url);
    return {sample: sample, name: src.name};
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
    if (this.currentBeat === 16) {
      this.currentBeat = 0;
    }
  }

  scheduleBeat = (beatNumber, time) => {
    this.queue.push({beat: beatNumber, time: time});

    for (var i = 0; i < this.pads.length; i++) {
      if (this.pads[i][beatNumber]) {
        this.playSample(this.state.samples[i].sample, time);
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
    if (this.audioContext.state == 'suspended') {
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

  handleBPMChange = (value) => {
    if (value >= 40 && value <= 240) {
      this.setState({bpm: value});
    }
  }

  sequenceButtonHandler = (row, col, sampleBtn) => {
    if (sampleBtn) {
      this.playSample(this.state.samples[row].sample, 0);
    }
    else {
      console.log("sequence button at row " + row + " col pushed");
      var temp = this.pads[row][col];
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

  renderButton(row, col){
    if (!col) {
      return(<Button 
        handleClick={this.sequenceButtonHandler} 
        row={row}
        text={typeof this.state.samples[row] === 'undefined' ? "" : this.state.samples[row].name} 
        sampleBtn />
      );
    } else {
      return (<Button 
        handleClick={this.sequenceButtonHandler} 
        row={row} 
        col={col-1} 
        playing={this.state.isPlaying} 
        currentBeat={this.state.drawBeat}/>
      );
    }
  }

  renderRow(row) {
    const cols = [];
    for (var i = 0; i < 17; i++) {
      cols.push(this.renderButton(row, i));
    }
    return (<div>{cols}</div>);
  }

  render() {
    const rows = [];
    for (var i = 0; i < 6; i++) {
      rows.push(this.renderRow(i));
    }

    return (
      <div className="component-app">
        <div className="content-wrapper">
          <div className="display-wrapper">
            <NumStepper value={"" + this.state.bpm} label={"BPM:"} min={40} max={240} changeHandler={this.handleBPMChange} defaultVal={100}/>
            <input type="image" src={powerIcon} className="on-button" onClick={this.playButtonHandler}/>
            <div className="bars-wrapper">
            </div>
          </div>
          <div className="button-panel">
            {rows}
          </div>
        </div>
      </div>
    );
  }
}
