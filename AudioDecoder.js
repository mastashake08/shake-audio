export class AudioDecoder {
  constructor() {
    this.decoder = new AudioContext();
  }

  async decode(buffer) {
    const audioBuffer = await this._decodeArrayBuffer(buffer);
    return audioBuffer;
  }

  async _decodeArrayBuffer(buffer) {
    return new Promise((resolve, reject) => {
      this.decoder.decodeAudioData(buffer, (audioBuffer) => {
        resolve(audioBuffer);
      }, (error) => {
        reject(error);
      });
    });
  }
}
