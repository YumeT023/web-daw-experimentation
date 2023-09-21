/**
 * @typedef TrackOptions
 * @property {string | Blob | ArrayBuffer} source
 * @property {number?} startsAt
 * @property {string?} title
 */
export class Track {
  /**
   *@type HTMLAudioElement
   */
  audio;
  /**
   * @type string
   */
  title;
  /**
   * @type number
   */
  startsAt;

  /**
   * @param {Omit<TrackOptions, 'source'>} options
   */
  constructor(options) {
    this.title = options.title ?? "";
    this.startsAt = options.startsAt ?? 0;
  }

  /**
   * @param {TrackOptions['source']} source
   */
  initAudio(source) {
    this.stop();
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
    let uri = source;
    if (source instanceof ArrayBuffer || source instanceof Blob) {
      uri = URL.createObjectURL(new Blob([source]));
    }
    console.log("loaded", this.audio);
    return new Promise((resolve) => {
      this.audio.src = uri;
      this.audio.onloadedmetadata = () => resolve();
    });
  }

  stop() {
    if (this.isReady) {
      this.audio.currentTime = 0;
      this.isPlaying && this.pause();
    }
  }

  pause() {
    this.audio.pause();
  }

  play() {
    this.audio
      .play()
      .then(() => {
        /* TODO  */
      })
      .catch(() => {
        /* TODO */
      });
  }

  get isReady() {
    return this.audio != null;
  }

  get isPlaying() {
    return !this.audio.paused;
  }

  get totalDuration() {
    return this.startsAt + this.audio.duration;
  }
}
