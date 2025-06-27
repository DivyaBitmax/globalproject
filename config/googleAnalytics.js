const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const analyticsClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(__dirname, '../service-account.json'), // make sure this file is in place
});

module.exports = analyticsClient;
