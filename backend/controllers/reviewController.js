  const Review = require("../models/Review");

  exports.addReview = async (req, res) => {
    console.log("addReview hit, body:", req.body);
    // const tenantId = req.session.user && req.session.user.id;   
    // if (!tenantId) return res.status(401).json({ error: "Unauthorized" }); 
    const userId = req.body.userId;    // Add this line for Postman testing

    const {propertyId, rating, comment } = req.body;

    try {
      const existing = await Review.findOne({ property: propertyId, tenant: userId });
      if (existing) return res.status(400).json({ error: "Already reviewed" });

     const review = new Review({ property: propertyId, tenant: userId, rating, comment });
     await review.save();

     res.status(201).json({ message: "Review added", review });
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };

 exports.getReviewsForProperty = async (req, res) => {
   const { propertyId } = req.params;
   try {
     const reviews = await Review.find({ property: propertyId }).populate("tenant", "username");
     res.json({ reviews });
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };