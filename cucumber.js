let options = [
    '--require ./--require ./src/tests/steps/*/*.js', // Load steps
    '--format html:test-results/Report.html', //HTML Report
    '--format json:test-results/cucumber-report.json', //Json Report
    '--dry-run' // Enable dry run mode
].join(' ')


let opt = [
    '--require ./src/tests/steps/*/*.js', // Specify our steps files location
    '--require ./src/hooks/hooks.js', // Specify our hooks files location

].join(' ')

let run_features = [
    './src/tests/features/*/*.feature', // Specify our feature files location
    '--format html:test-results/Report.html',
    '--format json:test-results/cucumber-report.json'
].join(' ');

let sanity_run = [
    './src/tests/features/EXPORT/TC_EX_001.feature', // Specify our feature files location
    // './src/tests/features/EXPORT/TC_EX_002.feature',
    './src/tests/features/IMPORT/TC_IM_001.feature',
    // './src/tests/features/IMPORT/TC_IM_002.feature',
    '--format html:test-results/Report.html', //HTML Report
    '--format json:test-results/cucumber-report.json', //Json Report
].join(' ');

// Ensure proper escaping of quotes for JSON options and join the array elements with a space
const options1 = `${opt} ${run_features}`;
const options2 = `${opt} ${sanity_run}`;

// Export the configuration for the test runner
module.exports = {
    test_runner: options2,
    parallel: 1,
};