export class Mixer {
  /**
   * @type Track[]
   */
  tracks;
  /**
   * @type number
   */
  _currentTime;
  /**
   * @type number
   */
  _cachedMinStartPos;
  /**
   * @type number
   */
  _frameRequest;

  /**
   * @param {Track[]} tracks
   */
  constructor(tracks = []) {
    this.tracks = tracks;
    this._cachedMinStartPos = 0;
    this.initCurrentTime();
  }

  /**
   * @param {Track} track
   */
  addTrack(track) {
    this.tracks.push(track);
    this.initCurrentTime();
  }

  findCurrentTracks() {
    return this.tracks.filter(
      (track) =>
        // current time is within the track
        this._currentTime >= track.startsAt &&
        this._currentTime < track.totalDuration
    );
  }

  initCurrentTime() {
    let minStartPos = 0;
    if (this.tracks.length) {
      const [t0, ...tracks] = this.tracks;
      minStartPos = tracks.reduce(
        (prev, current) => Math.min(prev, current.startsAt),
        t0.startsAt
      );
    }
    this._cachedMinStartPos = minStartPos;
    this._currentTime = minStartPos;
  }

  play() {
    this._sync();
    this.findCurrentTracks().forEach((track) => track.play());
  }

  pause() {
    this.findCurrentTracks().forEach((track) => track.pause());
  }

  stop() {
    this.findCurrentTracks().forEach((track) => track.stop());
    this._currentTime = this._cachedMinStartPos;
  }

  set currentTime(time) {
    const wasPlaying = this.isPlaying();
    this._updatePosition(time);
    if (wasPlaying) this.play();
  }

  _updatePosition(time) {
    const precisionSeconds = 0.3;
    const isPaused = !this.isPlaying();

    if (time !== this._currentTime) {
      this._currentTime = time;
    }

    this.tracks.forEach((track) => {
      const newTime = time - track.startsAt;
      const duration = track.audio.duration;

      if (Math.abs(track.audio.currentTime - newTime) > precisionSeconds) {
        track.audio.currentTime = newTime;
      }

      // track is out of the current time bounds
      if (isPaused || newTime < 0 || newTime > duration) {
        !isPaused && track.stop();
      } else if (!isPaused) {
        track.play();
      }
    });
  }

  _sync() {
    const doSync = () => {
      const position = this.tracks.reduce((pos, track) => {
        if (track.isPlaying) {
          pos = Math.max(pos, track.audio.currentTime + track.startsAt);
        }
        return pos;
      }, this._currentTime);

      if (position > this._currentTime) {
        this._updatePosition(position);
      }

      this._frameRequest = requestAnimationFrame(doSync);
    };
    doSync();
  }

  isPlaying() {
    return this.tracks.some((track) => track.isPlaying);
  }
}
