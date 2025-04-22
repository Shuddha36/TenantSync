const RentalRequest = require("../models/RentalRequest");

// Create a new rental request
exports.createRentalRequest = async (req, res) => {
  try {
    const rentalRequest = new RentalRequest(req.body);
    await rentalRequest.save();
    res.status(201).json(rentalRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a rental request
exports.updateRentalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const rentalRequest = await RentalRequest.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!rentalRequest) {
      return res.status(404).json({ message: "Rental request not found" });
    }

    res.status(200).json(rentalRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rental request
exports.deleteRentalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const rentalRequest = await RentalRequest.findByIdAndDelete(id);
    if (!rentalRequest) {
      return res.status(404).json({ error: "Rental request not found" });
    }
    res.status(200).json({ message: "Rental request deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
