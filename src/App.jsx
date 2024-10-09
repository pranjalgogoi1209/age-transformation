import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CameraPage from "./pages/CameraPage";
import OutputPage from "./pages/outputPage/OutputPage";
function App() {
  const [capturedImg, setCapturedImg] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CameraPage setCapturedImg={setCapturedImg} />}
        />
        <Route
          path="/output"
          element={<OutputPage capturedImg={capturedImg} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
