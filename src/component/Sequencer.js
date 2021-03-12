import React from "react";
import NumStepper from "./NumStepper";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import DropdownMenu from "./DropdownMenu";
import playIcon from "./assets/play.svg";
import stopIcon from "./assets/stop.svg";
import powerIcon from "./assets/power.svg";
import presets from "./presets.json";
import "./Sequencer.css";


export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.pads = [];
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
      samples: [],
      currentPattern: 0,
      currentDrumKit: "808"
    }
  }

  componentDidMount() {
    this.initializePads(this.pads);

    this.loadSamples();
  }

  loadSamples() {
    this.setState({samples: []}); // clear samples array

    let index = presets.drumKits.map((drumKit) => { return drumKit.name; }).indexOf(this.state.currentDrumKit);

    let samples = presets.drumKits[index].samples;
    for (let i = 0; i < samples.length; i++) {
      this.setupSample(samples[i]).then((sample) => {
        this.setState({ samples: [...this.state.samples, {sample: sample.sample, name: sample.name}] });
      });
    }
  }

  initializePads(arr) {
    for (let i = 0; i < 6; i++) {
      let temp = [];
      for (let j = 0; j < 16; j++) {
        temp.push(0);
      }
      arr.push(temp);
    }
  }

  /* web audio functions */

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
        if (typeof this.state.samples[i] != "undefined" && this.state.samples[i])
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

  start = () => {
    if (this.audioContext.state == 'suspended') {
      this.audioContext.resume();
    }

    this.currentBeat = 0;
    this.nextBeatTime = this.audioContext.currentTime;
    this.scheduler();
    requestAnimationFrame(this.draw);
  }

  stop = () => {
    window.clearTimeout(this.timerID);
  }

  /* animation functions */

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

  /* event handlers */

  handleBPMChange = (value) => {
    if (value >= 40 && value <= 240) {
      this.setState({bpm: value});
    }
  }

  sequenceButtonHandler = (row, col, sampleBtn) => {
    if (sampleBtn && typeof this.state.samples[row] != 'undefined' && this.state.samples[row]) {
      this.playSample(this.state.samples[row].sample, 0);
    } else {
      console.log("sequence button at row " + row + " col pushed");
      var temp = this.pads[row][col];
      this.pads[row][col] = (temp === 0 ? 1 : 0);
    }
  }

  playButtonHandler = () => {
    this.setState({isPlaying: !this.state.isPlaying}, () => {
      if (this.state.isPlaying) {
        this.start();
      } else {
        this.stop();
      }
    });
  }

  buttonGroupHandler = (pattern) => {
    this.setState({currentPattern: pattern-1});
  }

  drumKitChangeHandler = (value) => {
    this.setState({currentDrumKit: value}, () => {
      this.loadSamples()
    });
  }

  /* render functions */

  renderButton(row, col){
    if (!col) {
      return(<div className="sampleBtn-container">
        <label className="sampleBtn-label">
        {typeof this.state.samples[row] === 'undefined' ? "" : this.state.samples[row].name}
        </label>
        <Button handleClick={this.sequenceButtonHandler} 
        row={row}
        sampleBtn />
        </div>
      );
    } else {
      return (<Button handleClick={this.sequenceButtonHandler} 
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

    const drumKitNames = [];
    for (let i = 0; i < presets.drumKits.length; i++) {
      drumKitNames.push(presets.drumKits[i].name);
    }

    return (
      <div className="component-app">
        <div className="content-wrapper">
          <div className="display-wrapper">
            <div className="first-col-wrapper">
              <DropdownMenu label="drum kit" names={drumKitNames} changeHandler={this.drumKitChangeHandler}/>
              <NumStepper value={"" + this.state.bpm} label="BPM" min={40} max={240} changeHandler={this.handleBPMChange} defaultVal={100}/>
            </div>
            <button className={"on-button" + (this.state.isPlaying ? " playing" : "")} onClick={this.playButtonHandler}>
              <span>{(this.state.isPlaying ? "Stop" : "Play")}</span>
              <img src={playIcon} width="12" height="12" className={"play-icon" + (this.state.isPlaying ? " playing" : "")} />
              <img src={stopIcon} width="12" height="12" className={"stop-icon" + (this.state.isPlaying ? " playing" : "")} />
            </button>
            <div>
              <ButtonGroup labelText={"patterns"} selected={this.state.currentPattern} buttons={8} handleClick={this.buttonGroupHandler}/>
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
