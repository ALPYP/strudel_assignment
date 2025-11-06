function PlayButtons({ onPlay, onStop }) {
  return (
      <div className="form-button-container">
        <div className="btn-group" role="group" ara-label="Basic mixed styles example">
              <button id="play" className="btn-start" onClick={onPlay}>Play</button>
              <button id="stop" className="btn-stop" onClick={onStop}>Stop</button>
        </div>
    </div>
  );
}

export default PlayButtons;