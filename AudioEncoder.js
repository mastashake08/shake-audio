export class AudioEncoder {
  constructor() {
    this.encoder = new AudioContext();
  }


  async encode(audioBuffer, mimeType) {
    alert('Audio Encoding please do not close this window.')
    const blob = await this._encodeToBlob(audioBuffer, mimeType);
    const buffer = await this._readBlobAsArrayBuffer(blob);
    return buffer;
  }

  async _encodeToBlob(audioBuffer, mimeType) {
    return new Promise((resolve, reject) => {
      const audioData = this._flattenAudioBuffer(audioBuffer);
      const audioBufferSource = this.encoder.createBufferSource();
      audioBuffer = this.encoder.createBuffer(audioBuffer.numberOfChannels, audioData.length, audioBuffer.sampleRate);
      audioBuffer.getChannelData(0).set(audioData);
      audioBufferSource.buffer = audioBuffer;
      const dest = this.encoder.createMediaStreamDestination()
      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);


      });

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: mimeType });

        resolve(blob);
      });
      audioBufferSource.connect(dest);
      audioBufferSource.start();

      mediaRecorder.start()
      setTimeout(() => {
        mediaRecorder.stop();
        alert('Audio Encoded!')
      },  audioBufferSource.buffer.duration * 1000);
    });
  }

  async _readBlobAsArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        resolve(event.target.result);
      });

      reader.addEventListener("error", () => {
        reject(reader.error);
      });

      reader.readAsArrayBuffer(blob);
    });
  }

  _flattenAudioBuffer(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const audioData = new Float32Array(channelData.length);
    for (let i = 0; i < channelData.length; i++) {
      audioData[i] = channelData[i];
    }
    return audioData;
  }
}
