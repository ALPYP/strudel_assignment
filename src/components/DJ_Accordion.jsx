import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DJControls from './DJ_Controls';

function DJ_Accordion({ onInstrumentsChange }) {
    const [items, setItems] = useState([]);
    const [cpm, setcpm] = useState(120);
    const [selectedInstrument, setSelectedInstrument] = useState('sine');
    const idCounter = useRef(0); // keeps track of ids, make a new unique one

    // Create a new body for the accordion
    const addBody = () => {
        idCounter.current += 1;

        // creating new json data to be passed out
        const newItem = {
            id: idCounter.current,
            name: `${selectedInstrument} ${idCounter.current}`,
            choseInstrument: selectedInstrument,
            volume: 0,
            reverb: 0,
            bitCrush: false,
            coarse: false,
            distort: false
        };

        // add newItem  to existing items
        const newItems = [...items, newItem];
        setItems(newItems);
        if (onInstrumentsChange) {
            onInstrumentsChange(newItems, cpm);
        }
    }

    // Removes an body of the accordion
    const removeInstrument = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        if (onInstrumentsChange) {
            onInstrumentsChange(newItems, cpm);
        }
    }

    // updates info in side of dj_controls, id needs to be string and not number (integer)
    const updateInstrument = (id, updatedInstrument) => {
        const newItems = items.map(item => {
            if ((String)(item.id).localeCompare((String)(id)) === 0) {
                return updatedInstrument;
            }
            return item;
        });
        setItems(newItems);
        onInstrumentsChange?.(newItems, cpm);
    };

    // use effect for cpm based on change 
    useEffect(() => {
        if (onInstrumentsChange) {
            onInstrumentsChange(items, cpm);
        }
    }, [cpm]);

    return (
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="number" value={cpm} className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" onChange={(e) => setcpm(parseFloat(e.target.value) || 120)} aria-describedby="cpm_label" />
            </div>
            <div className="dj-accordion-controls-container">
                <button type="button" className="btn btn-primary" onClick={addBody}>Add instrument</button>
                <select className="form-select" value={selectedInstrument} onChange={(e) => setSelectedInstrument(e.target.value)} style={{ width: 'auto' }} >
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            <div className="accordion accordion-flush" id="dj-accordion">
                {items.map((item) => (
                    <div className="accordion-item" key={item.id}>
                        <h2 className="accordion-header" style={{ display: 'flex', alignItems: 'center' }}>
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#body-${item.id}`}
                                aria-expanded="false"
                                aria-controls={`body-${item.id}`}
                                style={{ flex: 1 }} >

                                {item.name}
                            </button>
                            <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => removeInstrument(item.id)} >
                                Remove
                            </button>
                        </h2>
                        <div id={`body-${item.id}`} className="accordion-collapse collapse" data-bs-parent="#dj-accordion" >
                            <div className="accordion-body">
                                <DJControls
                                    volume={item.volume} onVolumeChange={(e) => updateInstrument(item.id, {...item, volume: parseFloat(e.target.value) })}
                                    reverb={item.reverb} onReverbChange={(e) => updateInstrument(item.id, {...item, reverb: parseFloat(e.target.value) })}
                                    bitCrush={item.bitCrush} onBitCrushChange={(e) => updateInstrument(item.id, {...item, bitCrush: e.target.checked })}
                                    coarse={item.coarse} onCoarseChange={(e) => updateInstrument(item.id, {...item, coarse: e.target.checked })}
                                    distort={item.distort} onDistortChange={(e) => updateInstrument(item.id, {...item, distort: e.target.checked })} />
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default DJ_Accordion;