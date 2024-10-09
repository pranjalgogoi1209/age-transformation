import React, { useState, useRef, useEffect } from "react";
import styles from "./cameraPage.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CameraPage({ setCapturedImg }) {
  const webRef = useRef();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let countdownInterval;

    if (isCounting && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (isCounting && countdown === 0) {
      // Capture the screenshot when countdown hits 0
      if (webRef.current.getScreenshot()) {
        setIsCaptured(true);
        setImg(webRef.current.getScreenshot());
      }
      setIsCounting(false); // Stop counting
    }

    return () => clearInterval(countdownInterval); // Cleanup interval on unmount or re-run
  }, [isCounting, countdown]);

  const handleCapture = (e) => {
    // Reset countdown and start it
    setCountdown(3);
    setIsCounting(true);
  };

  const handleRetake = (e) => {
    setIsCaptured(false);
    setImg("");
    setCountdown(3); // Reset countdown for retake
  };

  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = async () => {
    if (img) {
      setCapturedImg(img);
      navigate("/output");
      console.log(img, "image data");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.CameraPage}`}>
      <h1>{isCaptured ? "Do You Like This ?" : "SMILE AND CLICK!"}</h1>
      <div className={`flex-col-center ${styles.cameraPageWrapper}`}>
        <main className={`flex-col-center ${styles.main}`}>
          <div className={`flex-row-center ${styles.webcamParent}`}>
            {!img && (
              <Webcam
                ref={webRef}
                id={styles.webcam}
                forceScreenshotSourceSize={true}
              />
            )}

            {!isCaptured && isCounting && (
              <h1 className={styles.countdown}>{countdown}</h1>
            )}

            {img && (
              <img
                src={img}
                alt="captured image"
                className={styles.capturedImage}
              />
            )}
          </div>
        </main>
      </div>

      <footer className={`flex-col-center ${styles.footer}`}>
        {isCaptured ? (
          <div className={`flex-col-center ${styles.foot}`}>
            <button onClick={handleSubmit} className={`btn1`}>
              YES! SUBMIT
            </button>

            <button onClick={(e) => handleRetake(e)} className={`btn1`}>
              RETAKE
            </button>
          </div>
        ) : (
          <div className={`flex-col-center ${styles.foot}`}>
            <button onClick={(e) => handleCapture(e)} className={`btn1`}>
              CAPTURE
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
