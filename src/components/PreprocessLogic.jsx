export function Preprocess({ inputText, jsonInfo }) { 

    let outputText = inputText + "\n//WSG this is a test";
    let cpm = jsonInfo.cpm;

    // Not Allowing cpm too  be too high or low
    if (cpm < 10) {
        cpm = 10;
    }
    else if (cpm > 2000) {
        cpm = 2000;
    }

    // Replace cps at the top from cpm
    outputText = outputText.replace(/setcps\(([^)]*)\)/i, `setcps(${cpm}/60/4)`
    )

    // go through instruments in jsoninfo and add them and their data like vol, reverb etc.
    if (jsonInfo && jsonInfo.instruments && jsonInfo.instruments.length > 0) { // check if there is info, instruments and the length is more than nothing
        jsonInfo.instruments.forEach((instrument, index) => {
            // name for variable, unique id and the instrument chosen to both differentiate it, and to know what it is
            const varName = `instrumentt_${index}_${instrument.choseInstrument}`;

            // put in info (bar effects which will be done ...)
            // did it as += bc it was wigging out with just + but idk y tho..
            let instrumentText = `\n${varName}:\n`;
            instrumentText += `note(pick(arpeggiator1, 0))`;
            instrumentText += `.sound("${instrument.choseInstrument}")`;
            instrumentText += `.gain(${instrument.volume})`;
            instrumentText += `.room(${instrument.reverb})`;

            // .. done here, based on if they are applied or not
            if (instrument.bitCrush) {
                instrumentText += `.crush(8)`;
            }
            if (instrument.coarse) {
                instrumentText += `.coarse(6)`;
            }
            if (instrument.distort) {
                instrumentText += `.distort(6)`;
            }

            outputText += "\n" + instrumentText;
        })
    }
    return outputText;
}