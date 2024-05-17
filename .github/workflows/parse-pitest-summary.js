const fs = require('fs');
const xml2js = require('xml2js');
const summaryPath = process.env.GITHUB_STEP_SUMMARY; // Access the GitHub environment variable

const parser = new xml2js.Parser();
fs.readFile('pitest-report.xml', (err, data) => {
    if (err) {
        console.error('Error reading XML file:', err);
        return;
    }

    parser.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        const mutations = result.mutations.mutation;
        const summaryLines = mutations.map(mutation => {
            const file = mutation.sourceFile[0];
            const method = mutation.mutatedMethod[0];
            const lineNumber = mutation.lineNumber[0];
            const detected = mutation.$.detected === 'true' ? '✅ Detected' : '❌ Not Detected';
            const status = mutation.$.status === 'KILLED' ? '💀 Killed' : '🚶 Survived';
            const description = mutation.description[0];

            return `### Mutation in ${file} (Line: ${lineNumber})
- **Method**: \`${method}\`
- **Status**: ${status}
- **Detection**: ${detected}
- **Description**: ${description}`;
        });

        const reportContent = `# Mutation Test Summary
## Overview
This report provides an overview of mutation testing results, indicating how mutations were handled by the test suite. Each entry details a mutation attempt, its detection status, and the specific mutation description.

${summaryLines.join('\n')}`;

        // Write directly to the GitHub Step Summary file
        fs.appendFileSync(summaryPath, reportContent + '\n');
    });
});
