function DJ_Controls({ test }) {
    return (
        <div className="dj-controls-container">
            <div className="accordion accordion-flush" id="instrument-accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse">AccordionItem 1</button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="instrument-accordion">
                        <div class="accordion-body"><code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
                    </div>
                </div>
            </div>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={test} id="volume_range" />

            <label htmlFor="reverb_range" className="form-label">Reverb</label>
            <input type="range" className="form-range" min="0" max="5" step="0.5" onMouseUp={test} id="reverb_range" />

        </div>
    );
}

// onChange={ProcAndPlay}

export default DJ_Controls;