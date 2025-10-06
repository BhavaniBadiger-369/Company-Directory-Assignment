const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// GET /api/companies
router.get("/", async (req, res) => {
  try {
    let {
      search = "",
      industry = "",
      location = "",
      size = "",
      minRating,
      maxRating,
      sortBy = "relevance",
      page = 1,
      limit = 10,
    } = req.query;

    page = Math.max(1, parseInt(page, 10));
    limit = Math.max(1, parseInt(limit, 10));

    const filter = {};

    // Search by name
    if (search.trim()) filter.name = { $regex: search, $options: "i" };

    // Industry
    if (industry.trim()) filter.industry = { $regex: industry, $options: "i" };

    // Location (headquarters)
    if (location.trim()) filter.headquarters = { $regex: location, $options: "i" };

    // Company Size (employees range)
    if (size) {
      const sizeRanges = {
        "1-10": { $gte: 1, $lte: 10 },
        "11-50": { $gte: 11, $lte: 50 },
        "51-100": { $gte: 51, $lte: 100 },
        "101-200": { $gte: 101, $lte: 200 },
        "200+": { $gte: 201 },
      };
      if (sizeRanges[size]) filter.employees = sizeRanges[size];
    }

    // Rating range
    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = Number(minRating);
      if (maxRating) filter.rating.$lte = Number(maxRating);
    }

    // Sorting logic
    const sortOptions = {};
    switch (sortBy) {
      case "nameAZ":
        sortOptions.name = 1;
        break;
      case "nameZA":
        sortOptions.name = -1;
        break;
      case "ratingHigh":
        sortOptions.rating = -1;
        break;
      case "ratingLow":
        sortOptions.rating = 1;
        break;
      case "foundedNew":
        sortOptions.founded = -1;
        break;
      case "foundedOld":
        sortOptions.founded = 1;
        break;
      default:
        sortOptions.createdAt = -1; // relevance = recently added
        break;
    }

    const skip = (page - 1) * limit;

    // Parallel query for efficiency
    const [companies, total] = await Promise.all([
      Company.find(filter).sort(sortOptions).skip(skip).limit(limit).lean(),
      Company.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      total,
      totalPages,
      currentPage: page,
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
