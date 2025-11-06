import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJ_Controls from './components/DJ_Controls';
import PlayButtons from './components/PlayButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './components/PreprocessLogic';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: procText, volume: volume, reverb: reverb, bitCrush: bitCrush, cpm: cpm });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    // Hooks

    const [procText, setProcText] = useState(stranger_tune)

    const [volume, setVolume] = useState(1);
    const [reverb, setReverb] = useState(1);

    const [cpm, setCpm] = useState(120);

    const [bitCrush, setBitCrush] = useState(false);

    const [state, setState] = useState("stop");

    // UseEffect for when play is pressed
    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume, reverb, cpm, bitCrush])
    
useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
        globalEditor.setCode(procText); //TR

        document.getElementById('proc').value = stranger_tune
        //SetupButtons()
        //Proc()
    }

}, [procText]);

// To update the code to reflect processText
    useEffect(() => {
        if (globalEditor) {
            globalEditor.setCode(procText);
        }
    }, [procText])

return (
    <div>
        <div className="title-part">
            <h2 className="form-title">Strudel Demo</h2>
        </div>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextarea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop");  handleStop() }} />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJ_Controls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)}
                            reverbChange={reverb} onReverbChange={(e) => setReverb(e.target.value)}
                            cpmChange={cpm} onCpmChange={(e) => setCpm(e.target.value)}
                            bitCrushChange={bitCrush} onBitCrushChange={(e) => setBitCrush(e.target.checked)} />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}