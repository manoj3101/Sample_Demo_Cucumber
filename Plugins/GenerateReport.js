const readCucumberReport = require('./ReadJson');
const fs = require('fs');
const ejs = require('ejs');

function generateHTMLReport(logs) {
    readCucumberReport.readCucumberReport((err, data) => {
        if (err) {
            console.error("Error reading cucumber report:", err);
            return;
        }
        const { testCases } = data;

        // testCases.forEach(testCase => {
        //     testCase.scenarios.forEach(scenario => {
        //         // Filter logs for this scenario
        //         scenario.logs = logs.filter(log => log.includes(scenario.name));
        //         console.log("Scenario Name:", scenario.name);
        //         console.log("Logs:", scenario.logs);
        //     });
        // });
        // Read the HTML file
        fs.readFile('./Plugins/Template.html', 'utf8', (err, htmlTemplate) => {
            if (err) {
                console.error("Error reading HTML file:", err);
                return;
            }

            // Render the HTML file with fetched data using EJS
            const renderedHtml = ejs.render(htmlTemplate, { testCases });

            // Write the rendered HTML to a new file or send it as a response
            fs.writeFile('./test-results/Automation_Report.html', renderedHtml, err => {
                if (err) {
                    console.error("Error writing rendered HTML file:", err);
                    return;
                }
                console.log("Rendered HTML file saved successfully.");
            });
        });
    });
}

module.exports = { generateHTMLReport };
