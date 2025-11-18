import { useState, useEffect } from "react";

function DJ_Controls({ volume, onVolumeChange, reverb, onReverbChange, bitCrush, onBitCrushChange, coarse, onCoarseChange, distort, onDistortChange }) {

    // local versions as the slider wont update, 
    const [localVolume, setLocalVolume] = useState(volume);
    const [localReverb, setLocalReverb] = useState(reverb);

    // update the passed in ones from the local ones used in the return below..
    useEffect(() => setLocalVolume(volume),
        [volume]);
    useEffect(() => setLocalReverb(reverb),
        [reverb]);

    return (
        <div className="dj-controls-container">
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <label htmlFor="volume_range" className="form-label-value">{localVolume}</label>
            <input type="range" value={localVolume} className="form-range" min="0" max="5" step="0.5" onMouseUp={onVolumeChange} onChange={e => setLocalVolume(parseFloat(e.target.value))}  id="volume_range" />

            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <label htmlFor="reverb_range" className="form-label-value">{localReverb}</label>
            <input type="range" value={localReverb} className="form-range" min="0" max="5" step="0.5" onMouseUp={onReverbChange} onChange={e => setLocalReverb(parseFloat(e.target.value))} id="reverb_range" />
            
            <div className="form-checkbox-container">
                <div className="form-check">
                    <input className="form-check-input" checked={bitCrush} type="checkbox" onChange={onBitCrushChange} value="" id="bitCrusher" />
                    <label className="form-check-label" htmlFor="bitCrusher">
                        BitCrusher
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" checked={coarse} type="checkbox" onChange={onCoarseChange} value="" id="coarse" />
                    <label className="form-check-label" htmlFor="coarse">
                        Coarse
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" checked={distort} type="checkbox" onChange={onDistortChange} value="" id="distort" />
                    <label className="form-check-label" htmlFor="distort">
                        Distort
                    </label>
                </div>
            </div>
        </div>
    );
}

// onChange={ProcAndPlay}

export default DJ_Controls;