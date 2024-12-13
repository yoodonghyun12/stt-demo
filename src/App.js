// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import STTDemo from "./components/STTDemo";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 사용자 정보 입력 페이지 */}
//         <Route path="/" element={<Home />} />
//         {/* 음성 인식(STT) 페이지 */}
//         <Route path="/stt" element={<STTDemo />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import STTDemo from "./components/STTDemo";

// function App() {
//   const [userInfo, setUserInfo] = useState({}); // 사용자 정보 상태 관리

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home setUserInfo={setUserInfo} />} />
//         <Route path="/stt" element={<STTDemo userInfo={userInfo} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import STTDemo from "./components/STTDemo";

function App() {
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 상태 관리

  return (
    <Routes>
      <Route path="/" element={<Home setUserInfo={setUserInfo} />} />
      <Route path="/stt" element={<STTDemo userInfo={userInfo} />} />
    </Routes>
  );
}

export default App;
