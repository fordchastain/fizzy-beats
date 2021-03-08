import React from "react";
import ButtonPanel from "./ButtonPanel"
import NumStepper from "./NumStepper"
import powerIcon from "./assets/power.png"
import presets from "./presets.json"
import "./Sequencer.css";


export default class Sequencer extends React.Component {

  constructor(props) {
    super(props);

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.lookAhead = 25.0;
    this.scheduleAheadTime = 0.1;

    this.state = {
      pads: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      queue: [],
      samples: [],
      currentBeat: 0,
      nextBeatTime: 0.0,
      bpm: 120, 
      isPlaying: false
    }
  }

  componentDidMount() {
    let sampleUrls = presets.drumKits[0].samples;
    for (var i = 0; i < sampleUrls.length; i++) {
      this.setupSample(sampleUrls[i]).then((sample) => {
        this.setState({samples: [...this.state.samples, sample]});
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
    const secondsPerBeat = 60.0 / this.state.bpm / 2; // divide by 2 for 8th notes
    this.setState({nextBeatTime: this.state.nextBeatTime + secondsPerBeat});

    this.setState({currentBeat: this.state.currentBeat + 1});
    if (this.state.currentBeat === 8) {
      this.setState({currentBeat: 0});
    }
  }

  scheduleBeat = (beatNumber, time) => {
    this.setState({ queue: [...this.state.queue, {beat: beatNumber, time: time}] });


  }

  togglePad = (row, col) => {
    this.setState(state => ({
      ...state,
      pads: state.pads.map((r, i) => r.map((c, j) => {
        if (i === row && j === col) {
          return (c === 0 ? 1 : 0);
        }
        else {
          return c;
        }
      }))
    }));
  }

  handleInput = (value) => {
    console.log("bpm changed to " + value);
  }

  sequenceButtonHandler = (row, col) => {
    if (this.audioContext === 'suspended') {
      this.audioContext.resume();
    }

    if (!col) {
      this.playSample(this.state.samples[row], 0);
    }
    else {
      console.log("sequence button at row " + row + " col pushed");
      this.togglePad(row, col-1); // use col-1 since first button isn't a sequence button
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
