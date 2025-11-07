export function Preprocess({ inputText, volume, reverb, cpm, bitCrush, coarse, distort }) {

    let outputText = inputText + "\n//WSG this is a test";

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

    outputText += `\n//all(x => x.gain(${volume}))`
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;
    let m;
    let matches = [];
    while ((m = regex.exec(outputText)) != null) {
        // Needed to avoid infinite loops with zero-witdh matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // Result can be accessed through the 'm-variable.
        m.forEach((match, groupIndex) => {
            matches.push(match)
        });
    }
    let matches2 = matches.map(
        match => {
            let matchNew = match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) => `gain(${captureGroup}*${volume})`)
                .replaceAll(/(?<!post)room\(([\d.]+)\)/g, (match, captureGroup) => `room(${captureGroup}*${reverb}*2)`);
            if (bitCrush) {
                matchNew = matchNew.replaceAll(/(?<!post)gain\(([^)]+)\)/g, (match, captureGroup) => `gain(${captureGroup}*${volume})\n.crush(8)`);
            }
            if (coarse) {
                matchNew = matchNew.replaceAll(/(?<!post)gain\(([^)]+)\)/g, (match, captureGroup) => `gain(${captureGroup}*${volume})\n.coarse(6)`);
            }
            if (distort) {
                matchNew = matchNew.replaceAll(/(?<!post)gain\(([^)]+)\)/g, (match, captureGroup) => `gain(${captureGroup}*${volume})\n.distort(6)`);
            }
            return matchNew;
        });

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText);    

    return matches3;
}