import { useEffect } from "react";
import { useRef } from "react";
import { sleep, drawFace } from "../utils";
import { SLEEP } from "../config";


const width = 600;
const height = 600;


const WebCam = ({ detector, stream }) => {

  const refVideo = useRef();
  const refImg = useRef();

  const takePhoto = async () => {

    if (!stream || !detector) return null

    const imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
    const frame = await imageCapture.grabFrame();

    let context = refImg.current.getContext('2d');
    context.clearRect(0, 0, width, height);

    context.drawImage(frame, 0, 0, frame.width, frame.height);

    try {
      const faces = await detector.estimateFaces(frame);
      Object.entries(faces).map(([_, val], __) => { drawFace(context, val) });
    } catch (error) {
      console.log(error);
    }
  }

  const takePhotoHelper = async () => {
    while (true) {
      await sleep(SLEEP);
      takePhoto();
    }
  }

  useEffect(() => { takePhotoHelper() })

  if (refVideo.current) {
    refVideo.current.srcObject = stream
  }

  return (
    <div>
      <video width={width} playsInline autoPlay ref={refVideo} style={{ visibility: 'hidden' }}></video>
      <canvas ref={refImg} width={width} height={height}></canvas>
    </div>
  )
}

export default WebCam;