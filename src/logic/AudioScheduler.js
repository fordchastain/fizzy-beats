export default class AudioScheduler {
  constructor(drawButtons) {
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
    this.bpm = 120;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.lookAhead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.timerID = null;
    this.currentBeat = 0;
    this.nextBeatTime = 0.0;
    this.lastBeatDrawn = 7;
    this.drawButtons = drawButtons;
  }

  async getFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async setupSample(url) {
    const sample = await this.getFile(url);
    return sample;
  }

  playSample(audioBuffer, time) {
    const sampleSource = this.audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(this.audioContext.destination);
    sampleSource.start(time);
    return sampleSource;
  }

  nextBeat() {
    const secondsPerBeat = 60.0 / this.bpm / 2;
    this.nextBeatTime += secondsPerBeat;

    this.currentBeat++;
    if (this.currentBeat === 8) {
      this.currentBeat = 0;
    }
  }

  scheduleBeat(beatNumber, time) {
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

  draw = () => {
    let drawBeat = this.lastBeatDrawn;
    const currentTime = this.audioContext.currentTime;

    while (this.queue.length && this.queue[0].time < currentTime) {
      this.drawBeat = this.queue[0].beat;
      this.queue.splice(0, 1);
    }

    if (this.lastBeatDrawn !== drawBeat) {
      this.drawButtons();

      this.lastBeatDrawn = drawBeat;
    }

    requestAnimationFrame(this.draw);
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

}