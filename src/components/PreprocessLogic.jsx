export function Preprocess({ inputText, volume, reverb, cpm, bitCrush }) {

    let outputText = inputText + "\n//WSG this is a test";

    // Replace cps at the top from cpm
    outputText = outputText.replace(/^setcps\(([\d.]+)\)/m, (match, captureGroup) =>
        `setcps(${cpm}/60/4)`
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
    let matches2 = null;
    // If bitcrush is checked, then add it
    if (bitCrush) {
        let matches2 = matches.map(
            match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
                `gain(${captureGroup}*${volume})`
            ).replaceAll(/(?<!post)room\(([\d.]+)\)/g, (match, captureGroup) =>
                `room(${captureGroup}*${reverb}*2)`
            )
        );
        matches2 += '\ncrush(8)';
    }
    else
    {
        matches2 = matches.map(
            match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
                `gain(${captureGroup}*${volume})`
            ).replaceAll(/(?<!post)room\(([\d.]+)\)/g, (match, captureGroup) =>
                `room(${captureGroup}*${reverb}*2)`
            )
        );
    }


    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText);

    return matches3;
}