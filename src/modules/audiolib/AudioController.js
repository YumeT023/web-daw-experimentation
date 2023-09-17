export class AudioController {
  /** @type {AudioContext} */
  _ctx;
  /** @type {AudioBufferSourceNode} */
  _source;
  /** @type {AudioBuffer} */
  _buffer;
  pausedAt = 0;
  startTime = 0;
  isPlaying = false;

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
    this.isPlaying = false;
  }

  schedulePlayAt(when, time) {
    this.#newSourceNode();
    this._source.start(this._ctx.currentTime + when, time ?? this.pausedAt);
    this.isPlaying = true;
  }

  play(time) {
    // TODO
    if (time) this.startTime = time;
    else this.startTime = this._ctx.currentTime - (this.pausedAt || 0);
    this._source.disconnect();
    this.schedulePlayAt(0, time ?? this.pausedAt);
  }

  stop() {
    this.startTime = 0;
    this.pausedAt = 0;
    this.isPlaying && this.hasBuffer && this._source.stop();
    this.isPlaying = false;
    this.#newSourceNode();
  }

  pause() {
    this.pausedAt = this._ctx.currentTime - this.startTime;
    this.isPlaying = false;
    this._source.stop();
  }

  get duration() {
    return this._buffer?.duration ?? 0;
  }

  get hasBuffer() {
    return this._buffer != null;
  }
}
