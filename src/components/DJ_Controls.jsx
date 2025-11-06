function DJ_Controls({ volume, onVolumeChange, reverb, onReverbChange, cpm, onCpmChange, bitCrush, onBitCrushChange, coarse, onCoarseChange, distort, onDistortChange }) {
    return (
        <div className="dj-controls-container">
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="number" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" onChange={onCpmChange} aria-describedby="cpm_label" />
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={onVolumeChange} id="volume_range" />

            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={onReverbChange} id="reverb_range" />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={onBitCrushChange} value="" id="bitCrusher" />
                <label className="form-check-label" htmlFor="bitCrusher">
                        BitCrusher
                    </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={onCoarseChange} value="" id="coarse" />
                <label className="form-check-label" htmlFor="coarse">
                    Coarse
                </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={onDistortChange} value="" id="distort" />
                <label className="form-check-label" htmlFor="distort">
                    Distort
                </label>
            </div>
        </div>
    );
}

// onChange={ProcAndPlay}

export default DJ_Controls;