export class AudioController {
  /** @type {AudioContext} */
  _ctx;
  /** @type {AudioBufferSourceNode} */
  _source;
  /** @type {AudioBuffer} */
  _buffer;
  pausedAt = 0;
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
    this.#initSourceNode();
  }

  #initSourceNode() {
    this._source = this._ctx.createBufferSource();
    this._source.buffer = this._buffer;
    this._source.connect(this._ctx.destination);
  }

  schedulePlayAt(when, time) {
    this.#initSourceNode();
    this._source.start(this._ctx.currentTime + when, time ?? this.pausedAt);
  }

  play(time) {
    this.startTime = this._ctx.currentTime - (this.pausedAt || 0);
    this.schedulePlayAt(0, time ?? this.pausedAt);
  }

  stop() {
    this.startTime = 0;
    this.pausedAt = 0;
    this._source.stop();
    this.#initSourceNode();
  }

  pause() {
    this.pausedAt = this._ctx.currentTime - this.startTime;
    this._source.stop();
  }
}
