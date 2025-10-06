const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    employees: { type: Number, required: true }, 
    founded: Number,
    headquarters: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3, // optional default
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
