const Client = require("../models/Client");




exports.getClients = async (req, res) => {
  try {
    let clients;
    if (req.user.role === "admin") {
      clients = await Client.find(); // Admin can see all
    } else {
      clients = await Client.find({ createdBy: req.user.id }); // User can only see their own
    }

    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};




exports.createClient = async (req, res) => {
  try {
    const clientData = {
      ...req.body,
      createdBy: req.user.id, // ✅ logged-in user's ID
    };

    const newClient = await Client.create(clientData);
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// ✏️ UPDATE client — admin only
// exports.updateClient = async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Client not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };








exports.updateClient = async (req, res) => {
  try {
    // ✅ Admin can edit any, user can only edit their own
    let query = { _id: req.params.id };
    if (req.user.role !== "admin") {
      query.createdBy = req.user.id;
    }

    const updated = await Client.findOneAndUpdate(query, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Client not found or access denied" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// ❌ DELETE client — admin only
exports.deleteClient = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET total number of clients
exports.getTotalClients = async (req, res) => {
  try {
    const total = await Client.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.getTodayClientsCount = async (req, res) => {
  try {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST = UTC + 5:30
    const now = new Date();

    // Create IST date
    const istDate = new Date(now.getTime() + IST_OFFSET);

    const istStartOfDay = new Date(istDate.setHours(0, 0, 0, 0));
    const istEndOfDay = new Date(istDate.setHours(24, 0, 0, 0));

    // Convert back to UTC for MongoDB comparison
    const startUTC = new Date(istStartOfDay.getTime() - IST_OFFSET);
    const endUTC = new Date(istEndOfDay.getTime() - IST_OFFSET);

    const count = await Client.countDocuments({
      createdAt: { $gte: startUTC, $lt: endUTC },
    });

    res.json({ todayClients: count });
  } catch (err) {
    console.error("Error getting today’s clients", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET total active clients
exports.getActiveClientsCount = async (req, res) => {
  try {
    const count = await Client.countDocuments({ status: "Active" });
    res.json({ activeClients: count });
  } catch (err) {
    console.error("Error fetching active clients", err);
    res.status(500).json({ message: "Server error" });
  }
};
