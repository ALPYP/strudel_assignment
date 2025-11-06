export function Preprocess({ inputText, volume }) {

    let outputText = inputText + "\n//WSG this is a test";

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
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );
    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText);

    return matches3;
}