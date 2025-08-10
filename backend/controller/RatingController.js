const Rating = require("../model/Rating");
const Store = require("../model/Store");

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  let userRating = await Rating.findOne({ storeId, userId: req.user.id });
  if (userRating) {
    userRating.rating = rating;
    await userRating.save();
  } else {
    userRating = await Rating.create({ storeId, userId: req.user.id, rating });
  }

  const ratings = await Rating.find({ storeId });
  const avg = ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;
  await Store.findByIdAndUpdate(storeId, { averageRating: avg });
  res.json(userRating);
};

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const updated = await Rating.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Rating not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};