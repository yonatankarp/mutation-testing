const fs = require('fs');
const xml2js = require('xml2js');
const core = require('@actions/core');

const filePath = 'build/reports/pitest/mutations.xml'; // Updated file path

const parser = new xml2js.Parser();
fs.readFile(filePath, (err, data) => {
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
        const fileGroups = mutations.reduce((acc, mutation) => {
            const file = mutation.sourceFile[0];
            if (!acc[file]) acc[file] = [];
            const method = mutation.mutatedMethod[0];
            const lineNumber = mutation.lineNumber[0];
            const detected = mutation.$.detected === 'true' ? '✅' : '❌';
            const status = mutation.$.status === 'KILLED' ? '💀' : '🚶';
            const description = mutation.description[0];

            acc[file].push(`${detected} \`${method}\` (Line ${lineNumber}) - ${description} ${status}`);
            return acc;
        }, {});

        let reportContent = "# Mutation Test Summary\n## Overview\nThis report provides an overview of mutation testing results, grouped by file. Each entry details a mutation attempt, its detection status, and specific mutation description.\n\n";

        Object.entries(fileGroups).forEach(([file, mutations]) => {
            reportContent += `### Mutations in ${file}\n`;
            mutations.forEach(mutation => {
                reportContent += `- ${mutation}\n`;
            });
            reportContent += '\n';
        });

        // Write directly to the GitHub Step Summary using @actions/core
        core.summary.addRaw(reportContent).write();
    });
});
