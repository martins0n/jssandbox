import { useEffect, useState} from "react";
import WebCam from "./components/WebCam";
import {initDetector, initStream} from "./utils";
function App() {
  
  const [detector, setDetector] = useState();
  const [stream, setStream] = useState();

  useEffect(() => {initDetector(setDetector)}, [])
  useEffect(() => {initStream(setStream)}, [])
  
  return (
    <>
      <WebCam detector={detector} stream={stream}></WebCam>
    </>
  );
}

export default App;
