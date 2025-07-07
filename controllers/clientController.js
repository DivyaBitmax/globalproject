const Client = require("../models/Client");

// 🔍 GET all clients
// exports.getClients = async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


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



// ➕ CREATE new client
// exports.createClient = async (req, res) => {
//   try {
//     const newClient = await Client.create(req.body);
//     res.status(201).json(newClient);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


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
exports.updateClient = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Client not found" });
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
