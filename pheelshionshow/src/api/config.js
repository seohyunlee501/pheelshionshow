// pages/api/config.js
import fs from "fs";

export default (req, res) => {
  // Define the path to your JSON file
  const jsonFilePath = "pheelshionshow/pheelshionshow.json"; // Replace with the actual path

  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
