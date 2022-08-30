import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { detectorConfig, constraints } from './config';

export const initDetector = async (setDetector) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  try {
    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    setDetector(detector);
  } catch (error) {
    console.log(error);
    model.dispose();
  }
}

export const initStream = async (setStream) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  console.log('Got stream with constraints:', constraints);
  setStream(stream);
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const drawFace = (context, face) => {
  context.fillStyle = "#FF0000";

  console.log(face);

  face.keypoints.map(({ x, y }) => context.fillRect(x, y, 1, 1));

  context.beginPath();
  context.moveTo(face.box.xMin, face.box.yMin);
  context.lineTo(face.box.xMax, face.box.yMin);
  context.lineTo(face.box.xMax, face.box.yMax);
  context.lineTo(face.box.xMin, face.box.yMax);
  context.lineTo(face.box.xMin, face.box.yMin);
  context.stroke();
}