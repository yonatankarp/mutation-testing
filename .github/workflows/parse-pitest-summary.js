const fs = require('fs');
const xml2js = require('xml2js');
const core = require('@actions/core');

const parser = new xml2js.Parser();
fs.readFile('pitest-report.xml', (err, data) => {
    if (err) {
        core.setFailed('Error reading XML file: ' + err.message);
        return;
    }

    parser.parseString(data, (err, result) => {
        if (err) {
            core.setFailed('Error parsing XML: ' + err.message);
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

            return `### Mutation in ${file} (Line: ${lineNumber})\n- **Method**: \`${method}\`\n- **Status**: ${status}\n- **Detection**: ${detected}\n- **Description**: ${description}`;
        });

        const reportContent = `# Mutation Test Summary\n## Overview\nThis report provides an overview of mutation testing results, indicating how mutations were handled by the test suite. Each entry details a mutation attempt, its detection status, and the specific mutation description.\n\n${summaryLines.join('\n\n')}`;

        // Write directly to the GitHub Step Summary using @actions/core
        core.summary.addRaw(reportContent).write();
    });
});
