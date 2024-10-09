import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./outputPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function OutputPage({ capturedImg }) {
  const printRef = useRef();
  const [generatedImg, setGeneratedImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const generateImage = async () => {
      if (capturedImg) {
        console.log("api calling started");

        try {
          const response = await axios.post(
            "https://age-transform-server.onrender.com/age-transform",
            { image: capturedImg, target_age: "54" }
          );

          console.log(response);
          console.log(response.data.url);

          setGeneratedImg(response.data.url);
        } catch (error) {
          console.error("Error generating image:", error);
        }
      }
    };
    if (capturedImg) {
      generateImage();
    }
  }, [capturedImg]);

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div
      className={`flex-col-center ${styles.OutputPage}`}
      style={{
        height: !generatedImg ? "calc(100dvh - 30vh)" : "calc(100dvh - 18vh)",
      }}
    >
      {generatedImg ? (
        <div className={`flex-col-center ${styles.generatedImgContainer}`}>
          <h1>
            READY TO <span style={{ display: "block" }}>DOWNLOAD</span>
          </h1>

          <div className={styles.imgContainer}>
            <img
              ref={printRef}
              className={styles.generatedImg}
              src={generatedImg}
              alt="generated-image"
            />
          </div>

          <div className={`flex-col-center ${styles.btnContainer}`}>
            {/* generate qr */}
            <div onClick={() => setShowQr(true)}>
              <button className="btn1">GENERATE QR</button>
            </div>

            {/* print */}
            <div onClick={handlePrint}>
              <button className="btn1">PRINT</button>
            </div>

            {/* start again */}
            <div>
              <button className="btn1" onClick={navigateToHome}>
                START AGAIN
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex-col-center ${styles.loaderContainer}`}>
          <h1>
            GENERATING<span style={{ display: "block" }}></span>
          </h1>
          <Loader />
        </div>
      )}
    </div>
  );
}
