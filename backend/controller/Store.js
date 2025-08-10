const Store = require("../model/Store");
const Rating = require("../model/Rating");

exports.addStore = async (req, res) => {
  const store = await Store.create(req.body);
  res.status(201).json(store);
};

exports.getStores = async (req, res) => {
  try {
    // Get all stores and populate owner details
    const stores = await Store.find().populate("ownerId", "name email");

    // For each store, calculate average rating and attach to store object
    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.find({ storeId: store._id });
        const avgRating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;
        return {
          ...store.toObject(),
          owner: store.ownerId, // populated owner details
          averageRating: avgRating,
        };
      })
    );

    res.json(storesWithRatings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStoreRatings = async (req, res) => {
  const ratings = await Rating.find({ storeId: req.params.id }).populate("userId", "name");
  res.json(ratings);
};