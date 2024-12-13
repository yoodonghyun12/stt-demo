// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && age && phone) {
//       // STT 페이지로 이동
//       navigate("/stt");
//     } else {
//       alert("모든 정보를 입력해주세요.");
//     }
//   };

//   return (
//     <div>
//       <h1>사용자 정보 입력</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="이름"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br />
//         <input
//           type="number"
//           placeholder="나이"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <br />
//         <input
//           type="tel"
//           placeholder="전화번호"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <br />
//         <button type="submit">다음</button>
//       </form>
//     </div>
//   );
// }

// export default Home;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ setUserInfo }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && phone) {
      setUserInfo({ name, age, phone }); // App.js로 데이터 전달
      navigate("/stt"); // STT 페이지로 이동
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  return (
    <div>
      <h1>사용자 정보 입력</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default Home;

