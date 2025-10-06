require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("./models/Company");

// 50 Sample Companies 
const sampleCompanies = [
  // Manufacturing
  { name: "Acme Corp", industry: "Manufacturing", employees: 1200, founded: 1998, headquarters: "New York, USA", description: "Leading manufacturer of widgets." },
  { name: "SteelWorks", industry: "Manufacturing", employees: 900, founded: 1995, headquarters: "Pittsburgh, USA", description: "Industrial steel and alloys producer." },
  { name: "AutoMotiveX", industry: "Automobile", employees: 4000, founded: 2002, headquarters: "Detroit, USA", description: "Electric and hybrid vehicle manufacturer." },
  { name: "Texo Industries", industry: "Textiles", employees: 700, founded: 1991, headquarters: "Dallas, USA", description: "Eco-friendly clothing manufacturer." },
  { name: "Precision Tools", industry: "Manufacturing", employees: 350, founded: 2010, headquarters: "Cleveland, USA", description: "High-performance industrial tools." },

  // Software / IT
  { name: "Stellar Soft", industry: "Software", employees: 85, founded: 2015, headquarters: "San Francisco, USA", description: "Cloud-native developer tools." },
  { name: "CodeNest", industry: "Software", employees: 120, founded: 2017, headquarters: "Austin, USA", description: "Building modern SaaS platforms." },
  { name: "LogicTree", industry: "Software", employees: 400, founded: 2010, headquarters: "Seattle, USA", description: "Custom enterprise software solutions." },
  { name: "PixelForge", industry: "Software", employees: 75, founded: 2020, headquarters: "Los Angeles, USA", description: "Creative design and app development studio." },
  { name: "AppVerge", industry: "Software", employees: 200, founded: 2013, headquarters: "Boston, USA", description: "Mobile app solutions for enterprises." },

  // Agriculture
  { name: "GreenFields", industry: "Agriculture", employees: 300, founded: 1970, headquarters: "Austin, USA", description: "Sustainable farming solutions." },
  { name: "AgriGrow", industry: "Agriculture", employees: 200, founded: 1990, headquarters: "Fresno, USA", description: "Organic crop innovation and distribution." },
  { name: "FarmEase", industry: "Agriculture", employees: 150, founded: 2012, headquarters: "Kansas City, USA", description: "IoT solutions for smart farming." },
  { name: "CropLife", industry: "Agriculture", employees: 230, founded: 2008, headquarters: "Omaha, USA", description: "Agro products and soil management services." },
  { name: "NatureNest", industry: "Agriculture", employees: 95, founded: 2019, headquarters: "Denver, USA", description: "Organic foods and supply chain services." },

  // Healthcare
  { name: "MediLife", industry: "Healthcare", employees: 950, founded: 2010, headquarters: "Boston, USA", description: "Digital healthcare solutions." },
  { name: "HealthNova", industry: "Healthcare", employees: 500, founded: 2011, headquarters: "Chicago, USA", description: "Healthcare analytics and patient management systems." },
  { name: "BioCore", industry: "Healthcare", employees: 1300, founded: 2003, headquarters: "Philadelphia, USA", description: "Biotech and medical device innovations." },
  { name: "CareFirst", industry: "Healthcare", employees: 450, founded: 2018, headquarters: "Atlanta, USA", description: "Telemedicine and remote care solutions." },
  { name: "PharmaX", industry: "Healthcare", employees: 1100, founded: 2005, headquarters: "New Jersey, USA", description: "Pharmaceutical research and distribution." },

  // Finance
  { name: "FinEdge", industry: "Finance", employees: 400, founded: 2005, headquarters: "Chicago, USA", description: "Fintech innovations for modern banking." },
  { name: "MoneyMatters", industry: "Finance", employees: 270, founded: 2014, headquarters: "New York, USA", description: "Personal finance management apps." },
  { name: "CrediSure", industry: "Finance", employees: 320, founded: 2007, headquarters: "San Diego, USA", description: "Insurance and credit analytics." },
  { name: "SafeBank", industry: "Finance", employees: 1500, founded: 1995, headquarters: "New York, USA", description: "Global retail and corporate banking services." },
  { name: "TradePro", industry: "Finance", employees: 600, founded: 2012, headquarters: "Miami, USA", description: "Online stock and crypto trading platform." },

  // Construction
  { name: "EcoBuild", industry: "Construction", employees: 600, founded: 1995, headquarters: "Dallas, USA", description: "Eco-friendly building materials." },
  { name: "UrbanRise", industry: "Construction", employees: 500, founded: 2000, headquarters: "Houston, USA", description: "Smart residential and commercial projects." },
  { name: "Skyline Builders", industry: "Construction", employees: 750, founded: 2003, headquarters: "San Diego, USA", description: "High-rise and sustainable architecture." },
  { name: "BuildHub", industry: "Construction", employees: 320, founded: 2018, headquarters: "Phoenix, USA", description: "Construction project management software." },
  { name: "MasonPro", industry: "Construction", employees: 400, founded: 2010, headquarters: "Charlotte, USA", description: "Custom stone and construction solutions." },

  // Education
  { name: "EduWave", industry: "Education", employees: 250, founded: 2015, headquarters: "Seattle, USA", description: "E-learning platforms and LMS tools." },
  { name: "FrontLearn", industry: "Education", employees: 130, founded: 2017, headquarters: "Chicago, USA", description: "Interactive online education solutions." },
  { name: "SkillMatrix", industry: "Education", employees: 300, founded: 2019, headquarters: "Los Angeles, USA", description: "AI-driven skill assessment and courses." },
  { name: "ClassTech", industry: "Education", employees: 200, founded: 2021, headquarters: "New York, USA", description: "Smart classroom software and devices." },
  { name: "BrightEdu", industry: "Education", employees: 180, founded: 2014, headquarters: "Denver, USA", description: "Digital content and tutoring services." },

  // Energy / Environment
  { name: "Solaris Energy", industry: "Energy", employees: 450, founded: 2006, headquarters: "Austin, USA", description: "Solar energy and grid solutions." },
  { name: "WindPro", industry: "Energy", employees: 520, founded: 2012, headquarters: "Minneapolis, USA", description: "Wind turbine manufacturing and maintenance." },
  { name: "EcoPower", industry: "Energy", employees: 700, founded: 2010, headquarters: "Denver, USA", description: "Renewable energy research and implementation." },
  { name: "GridLink", industry: "Energy", employees: 300, founded: 2015, headquarters: "Atlanta, USA", description: "Smart grid monitoring systems." },
  { name: "HydroCore", industry: "Energy", employees: 900, founded: 2008, headquarters: "Portland, USA", description: "Hydroelectric and green energy firm." },

  // Logistics
  { name: "TransLogix", industry: "Logistics", employees: 800, founded: 2003, headquarters: "Memphis, USA", description: "Global logistics and freight management." },
  { name: "ShipEase", industry: "Logistics", employees: 350, founded: 2011, headquarters: "Houston, USA", description: "On-demand shipping and delivery platform." },
  { name: "CargoHub", industry: "Logistics", employees: 420, founded: 2014, headquarters: "Los Angeles, USA", description: "Smart logistics and warehouse automation." },
  { name: "MovePro", industry: "Logistics", employees: 300, founded: 2016, headquarters: "Atlanta, USA", description: "Transport and relocation services." },
  { name: "FreightWave", industry: "Logistics", employees: 500, founded: 2013, headquarters: "Chicago, USA", description: "Freight tracking and route optimization." },
].map(company => ({
  ...company,
  rating: Math.floor(Math.random() * 5) + 1 // random rating 1–5
}));

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set in .env");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Company.deleteMany({});
    console.log("Old company data cleared");

    // Insert new data
    const inserted = await Company.insertMany(sampleCompanies, { ordered: false });
    console.log(`Successfully inserted ${inserted.length} companies`);
  } catch (err) {
    console.error("Error during seeding:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

seed();
