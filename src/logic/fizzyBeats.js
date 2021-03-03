const ac = new AudioContext();

async function getFile(audCont, fp) {
	const resp = await fetch(fp);
	const arrBuf = await resp.arrayBuffer();
	const audBuf = await audCont.decodeAudioData(arrBuf);
	return audBuf;
}

async function setupSample(url) {
	const sample = await getFile(ac, url);
	return sample;
}

function playSample(audCont, audBuf, time) {
	const sampleSrc = audCont.createBufferSource();
	sampleSrc.buffer = audBuf;
	sampleSrc.connect(audCont.destination);
	sampleSrc.start(time);
	return sampleSrc;
}

const lookAhead = 25.0;
const scheduleAheadTime = 0.1;

let currentBeat = 0;
let nextBeatTime = 0.0;

function nextBeat(bpm) {
	const secondsPerBeat = 60.0 / bpm / 2; // divide by 2 for 8th notes, 4 for 16th notes
	nextBeatTime += secondsPerBeat;

	currentBeat++;
	if (currentBeat === 8) {
		currentBeat = 0;
	}
}

const beatsQueue = [];


function scheduleBeat(beatNumber, time, beatArray) {

}