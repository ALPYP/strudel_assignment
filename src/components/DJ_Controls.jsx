function DJ_Controls({ volume, onVolumeChange, reverb, onReverbChange, cpm, onCpmChange, delay, onDelayChange }) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" value={cpm} onChange={onCpmChange} aria-label="cpm" aria-describedby="cpm_label" />
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={onVolumeChange} id="volume_range" />

            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={onReverbChange} id="reverb_range" />


            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="delay" />
                <label className="form-check-label" htmlFor="delay">
                        Delay
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                        d1
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" htmlFor="d2">
                    d2
                </label>
            </div>
        </>
    );
}

// onChange={ProcAndPlay}

export default DJ_Controls;