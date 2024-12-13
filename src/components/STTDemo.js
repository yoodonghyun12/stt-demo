




//이건 대사는 한개지만 잘 작동하는거

// import React, { useState, useRef } from "react";

// function STTDemo({ userInfo }) {
//   const [result, setResult] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [error, setError] = useState(""); // 오류 메시지 상태
//   const targetText = "가을은 수확의 계절입니다"; // 녹음 대사
//   const audioFormat = "audio/webm"; // 저장할 파일 형식

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   const recognition = useRef(
//     SpeechRecognition ? new SpeechRecognition() : null
//   );
//   const silenceTimer = useRef(null);
//   const mediaRecorder = useRef(null);

//   if (!SpeechRecognition) {
//     alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
//     return <div>음성 인식이 지원되지 않는 브라우저입니다.</div>;
//   }

//   recognition.current.lang = "ko-KR";
//   recognition.current.interimResults = false;

//   const checkHTTPS = () => {
//     if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
//       alert("마이크 권한은 HTTPS 환경에서만 작동합니다.");
//       return false;
//     }
//     return true;
//   };

//   const startRecognition = async () => {
//     if (!checkHTTPS()) return; // HTTPS 환경 확인

//     if (!isListening) {
//       try {
//         // 마이크 접근 권한 요청
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//         // MediaRecorder 초기화
//         mediaRecorder.current = new MediaRecorder(stream, { mimeType: audioFormat });

//         const chunks = [];
//         mediaRecorder.current.ondataavailable = (event) => {
//           chunks.push(event.data);
//         };

//         mediaRecorder.current.onstop = () => {
//           const audioBlob = new Blob(chunks, { type: audioFormat });
//           setAudioBlob(audioBlob);
//         };

//         mediaRecorder.current.start();
//         console.log("녹음 시작...");
//         recognition.current.start();
//         setIsListening(true);

//         // 7초 타이머 설정
//         silenceTimer.current = setTimeout(() => {
//           stopRecognition();
//           alert("더 큰 목소리로 발음해주세요!");
//         }, 7000);
//       } catch (err) {
//         handleGetUserMediaError(err);
//       }
//     }
//   };

//   const stopRecognition = () => {
//     if (isListening) {
//       recognition.current.stop();
//       mediaRecorder.current && mediaRecorder.current.stop();
//       setIsListening(false);
//       console.log("음성 인식 및 녹음 중지...");
//       clearTimeout(silenceTimer.current);
//     }
//   };

//   recognition.current.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setResult(transcript);
//     console.log("인식된 음성:", transcript);
//     clearTimeout(silenceTimer.current);

//     if (transcript !== targetText) {
//       alert("다시 한번 정확히 발음해주세요.");
//     } else {
//       alert("정확히 발음했습니다!");
//     }
//   };

//   recognition.current.onerror = (event) => {
//     console.error("오류 발생:", event.error);
//     setError(`오류 발생: ${event.error}`);
//     stopRecognition();
//   };

//   const handleGetUserMediaError = (err) => {
//     console.error("getUserMedia 오류:", err);

//     if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
//       alert("마이크 권한이 거부되었습니다. 브라우저 설정에서 권한을 확인해주세요.");
//     } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
//       alert("마이크가 연결되어 있지 않습니다.");
//     } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
//       alert("마이크에 접근할 수 없습니다. 다른 프로그램이 마이크를 사용 중일 수 있습니다.");
//     } else {
//       alert("알 수 없는 오류가 발생했습니다. 콘솔을 확인해주세요.");
//     }
//     setError(err.message || "알 수 없는 오류");
//   };

//   const saveAudio = () => {
//     if (audioBlob) {
//       const { name, age, phone } = userInfo;
//       const extension = audioFormat.split("/")[1];
//       const fileName = `${name}_${age}_${phone}_${targetText}.${extension}`;
//       const url = URL.createObjectURL(audioBlob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = fileName;
//       a.click();
//       console.log("오디오 파일 저장됨:", fileName);
//     } else {
//       alert("저장할 녹음 파일이 없습니다.");
//     }
//   };

//   return (
//     <div>
//       <h1>STT (Speech-to-Text) 데모</h1>
//       <p>
//         <strong>대사:</strong> {targetText}
//       </p>
//       <button onClick={startRecognition} disabled={isListening}>
//         음성 인식 및 녹음 시작
//       </button>
//       <button onClick={stopRecognition} disabled={!isListening}>
//         음성 인식 및 녹음 중지
//       </button>
//       <button onClick={saveAudio} disabled={!audioBlob}>
//         녹음 파일 저장
//       </button>
//       <p>결과: <span>{result}</span></p>
//       {error && <p style={{ color: "red" }}>오류: {error}</p>}
//     </div>
//   );
// }

// export default STTDemo;


import React, { useState, useRef } from "react";
import { webmToWav } from "../utils/WebmToWav"; // WebM to WAV 변환 함수

function STTDemo({ userInfo }) {
  const [result, setResult] = useState(""); // STT 결과 저장
  const [isListening, setIsListening] = useState(false); // 녹음 상태
  const [audioBlob, setAudioBlob] = useState(null); // 녹음 데이터 저장
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 대사 인덱스
  const [error, setError] = useState(""); // 오류 메시지 저장

  const scripts = [
    "가을은 수확의 계절입니다",
    "봄은 따뜻한 바람이 불어옵니다",
    "여름은 태양이 뜨겁습니다",
    "겨울은 눈이 내립니다",
    "오늘은 정말 좋은 날씨입니다",
    "이 대화는 마무리되었습니다"
  ];

  const mediaRecorder = useRef(null);
  const recognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const webmBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(webmBlob);
      };

      mediaRecorder.current.start();
      setIsListening(true);
      console.log("녹음 시작...");

      startSpeechRecognition();
    } catch (err) {
      console.error("녹음 오류:", err);
      setError("마이크 권한이 필요합니다. 브라우저 설정을 확인해주세요.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      console.log("녹음 중지...");
    }
    stopSpeechRecognition();
    setIsListening(false);
  };

  const startSpeechRecognition = () => {
    recognition.current.lang = "ko-KR";
    recognition.current.interimResults = false;

    recognition.current.start();
    console.log("STT 시작...");

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setResult(transcript);
      console.log("인식된 텍스트:", transcript);

      if (transcript === scripts[currentIndex]) {
        if (currentIndex < scripts.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          alert("정확히 발음했습니다! 다음 대사로 이동합니다.");
        } else {
          alert("모든 대사를 완료했습니다!");
          stopRecording();
        }
      } else {
        alert("대사가 일치하지 않습니다. 다시 시도해주세요.");
      }
    };

    recognition.current.onerror = (event) => {
      console.error("STT 오류:", event.error);
      setError(`STT 오류: ${event.error}`);
    };
  };

  const stopSpeechRecognition = () => {
    recognition.current.stop();
    console.log("STT 중지...");
  };

  const saveAsWav = async () => {
    if (!audioBlob) {
      alert("저장할 녹음 파일이 없습니다.");
      return;
    }

    try {
      const wavBlob = await webmToWav(audioBlob);
      const { name, age, phone } = userInfo || { name: "이름", age: "나이", phone: "전화번호" };
      const fileName = `${name}_${age}_${phone}_script${currentIndex + 1}.wav`;

      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      console.log("WAV 파일 저장 완료:", fileName);
    } catch (err) {
      console.error("WAV 변환 오류:", err);
      alert("WAV 파일 변환 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>STT (Speech-to-Text) 데모</h1>
      <p>
        <strong>현재 대사:</strong> {scripts[currentIndex]}
      </p>
      <p>
        <strong>STT 결과:</strong> {result}
      </p>
      <button onClick={startRecording} disabled={isListening}>
        녹음 시작
      </button>
      <button onClick={stopRecording} disabled={!isListening}>
        녹음 중지
      </button>
      <button onClick={saveAsWav} disabled={!audioBlob}>
        WAV 파일 저장
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default STTDemo;
