const analyticsClient = require('../config/googleAnalytics');

// Use your real GA4 property ID like this
const propertyId = 'properties/494818279';

exports.getTodayVisitors = async (req, res) => {
  try {
    const [response] = await analyticsClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate: 'today', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });

    const count = response.rows?.[0]?.metricValues?.[0]?.value || '0';
    res.status(200).json({ todayVisitors: count });
  } catch (error) {
    console.error('GA Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch GA4 data' });
  }
};
