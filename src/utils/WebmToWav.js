// export async function webmToWav(webmBlob) {
//     // WebM 데이터를 ArrayBuffer로 변환
//     const arrayBuffer = await webmBlob.arrayBuffer();
  
//     // 샘플 데이터 생성 (간단한 WAV 변환 예제)
//     const wavHeader = createWavHeader(arrayBuffer.byteLength);
//     const wavBuffer = new Uint8Array(wavHeader.length + arrayBuffer.byteLength);
//     wavBuffer.set(wavHeader, 0);
//     wavBuffer.set(new Uint8Array(arrayBuffer), wavHeader.length);
  
//     // WAV Blob 생성
//     return new Blob([wavBuffer], { type: "audio/wav" });
//   }
  
//   // 간단한 WAV 헤더 생성
//   function createWavHeader(dataSize) {
//     const buffer = new ArrayBuffer(44);
//     const view = new DataView(buffer);
  
//     /* ChunkID "RIFF" */
//     writeString(view, 0, "RIFF");
//     view.setUint32(4, 36 + dataSize, true); // ChunkSize
//     writeString(view, 8, "WAVE");
  
//     /* Subchunk1ID "fmt " */
//     writeString(view, 12, "fmt ");
//     view.setUint32(16, 16, true); // Subchunk1Size
//     view.setUint16(20, 1, true); // AudioFormat (PCM)
//     view.setUint16(22, 1, true); // NumChannels (모노)
//     view.setUint32(24, 44100, true); // SampleRate
//     view.setUint32(28, 44100 * 2, true); // ByteRate
//     view.setUint16(32, 2, true); // BlockAlign
//     view.setUint16(34, 16, true); // BitsPerSample
  
//     /* Subchunk2ID "data" */
//     writeString(view, 36, "data");
//     view.setUint32(40, dataSize, true); // Subchunk2Size
  
//     return new Uint8Array(buffer);
//   }
  
//   // 문자열을 ArrayBuffer에 기록
//   function writeString(view, offset, string) {
//     for (let i = 0; i < string.length; i++) {
//       view.setUint8(offset + i, string.charCodeAt(i));
//     }
//   }
  






// WebM 데이터를 WAV로 변환하는 함수
export async function webmToWav(webmBlob) {
    const arrayBuffer = await webmBlob.arrayBuffer();
  
    // WAV 헤더 생성 및 WebM 데이터를 삽입
    const wavHeader = createWavHeader(arrayBuffer.byteLength);
    const wavBuffer = new Uint8Array(wavHeader.length + arrayBuffer.byteLength);
    wavBuffer.set(wavHeader, 0);
    wavBuffer.set(new Uint8Array(arrayBuffer), wavHeader.length);
  
    // 변환된 WAV 파일 Blob 생성
    return new Blob([wavBuffer], { type: "audio/wav" });
  }
  
  // WAV 파일 헤더 생성 함수
  function createWavHeader(dataSize) {
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);
  
    // "RIFF" Chunk
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true); // 총 파일 크기
    writeString(view, 8, "WAVE");
  
    // "fmt " Subchunk
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size (고정값 16)
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, 1, true); // NumChannels (모노)
    view.setUint32(24, 44100, true); // SampleRate (44100Hz)
    view.setUint32(28, 44100 * 2, true); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
    view.setUint16(32, 2, true); // BlockAlign (NumChannels * BitsPerSample/8)
    view.setUint16(34, 16, true); // BitsPerSample (16-bit PCM)
  
    // "data" Subchunk
    writeString(view, 36, "data");
    view.setUint32(40, dataSize, true); // Subchunk2Size (데이터 크기)
  
    return new Uint8Array(buffer);
  }
  
  // 문자열을 DataView에 기록하는 함수
  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
  