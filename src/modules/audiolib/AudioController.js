export class AudioController {
  /**
   * Its own AudioContext to avoid interfering from other's operations
   * @type AudioContext
   */
  _ctx;
  /**
   * @type AudioBufferSourceNode
   */
  _source;
  /**
   * Hold the buffer to be able to reuse it when renewing the sourceNode
   * @type AudioBuffer
   */
  _buffer;
  // record time 'in seconds' at which the playback is paused
  pausedAt = 0;
  // hold the timestamp at which a playback start
  startTime = 0;

  constructor() {
    this._ctx = new AudioContext();
  }

  /**
   * load audio buffer into the 'AudioBufferSourceNode'
   * @param {AudioBuffer} buffer
   */
  load(buffer) {
    this._buffer = buffer;
    this.#newSourceNode();
  }

  /**
   * @param {ArrayBuffer} buffer
   */
  async loadArrayBuffer(buffer) {
    const audioBuffer = await this._ctx.decodeAudioData(buffer);
    this.load(audioBuffer);
  }

  #newSourceNode() {
    this._source = this._ctx.createBufferSource();
    if (this._buffer) this._source.buffer = this._buffer;
    this._source.connect(this._ctx.destination);
  }

  #renewSourceNode() {
    this._source && this._source.disconnect();
    this.#newSourceNode();
  }

  schedulePbAt(when, time) {
    this.#renewSourceNode();
    this.pausedAt = time;
    this.startTime = this._ctx.currentTime - time;
    this._source.start(this._ctx.currentTime + when, time);
  }

  play(time = 0) {
    // 'schedulePbAt' will renew the sourceNode
    this.schedulePbAt(0, time);
  }

  resume() {
    this.play(this.pausedAt);
  }

  pause() {
    if (this.hasBuffer) {
      this._source.stop();
      this.pausedAt = this._ctx.currentTime - this.startTime;
    }
  }

  stop() {
    this.pausedAt = 0;
    this.startTime = 0;
    this.#renewSourceNode();
  }

  get duration() {
    return this._buffer?.duration ?? 0;
  }

  get hasBuffer() {
    return this._buffer != null;
  }
}
