export const detectorConfig = {
	runtime: 'mediapipe', // or 'tfjs'
	solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
};

export const constraints = window.constraints = {
	audio: false,
	video: true
};


export const SLEEP = 30;