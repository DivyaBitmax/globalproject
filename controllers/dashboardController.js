// // const Visitor = require("../models/Visitor");
// const Form = require("../models/form")
// exports.getDashboardSummary = async (req, res) => {
//   try {
//     const totalUsers = await Visitor.countDocuments(); // ✅ Real total visitors
//     const registered = await Form.countDocuments();    // ✅ Form submissions
//     const today = new Date().toISOString().split("T")[0];

//     const startOfDay = new Date(today);
//     const endOfDay = new Date(today);
//     endOfDay.setHours(23, 59, 59, 999);

//     const todaysForms = await Form.countDocuments({
//       createdAt: { $gte: startOfDay, $lte: endOfDay }
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         totalUsers,
//         registered,
//         todaysForms
//       }
//     });
//   } catch (error) {
//     console.error("Dashboard summary error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// const analyticsClient = require('../config/googleAnalytics');
// const Form = require('../models/form');

// const propertyId = 'properties/494818279';

// exports.getDashboardSummary = async (req, res) => {
//   try {
//     // ✅ Get today's visitor count from GA4
//     const [gaResponse] = await analyticsClient.runReport({
//       property: propertyId,
//       dateRanges: [{ startDate: 'today', endDate: 'today' }],
//       metrics: [{ name: 'activeUsers' }],
//     });

//     const totalUsers = parseInt(gaResponse?.rows?.[0]?.metricValues?.[0]?.value || '0');

//     // ✅ Count registered users
//     const registered = await Form.countDocuments();

//     // ✅ Count today's form submissions
//     const today = new Date().toISOString().split("T")[0];
//     const startOfDay = new Date(today);
//     const endOfDay = new Date(today);
//     endOfDay.setHours(23, 59, 59, 999);

//     const todaysForms = await Form.countDocuments({
//       createdAt: { $gte: startOfDay, $lte: endOfDay }
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         totalUsers,
//         registered,
//         todaysForms
//       }
//     });

//   } catch (error) {
//     console.error("Dashboard summary error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



const Form = require('../models/form');
const Visitor = require("../models/Visitor");

exports.getDashboardSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const totalUsers = await Visitor.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const registered = await Form.countDocuments();

    const todaysForms = await Form.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        registered,
        todaysForms
      }
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
