const { GoogleSpreadsheet } = require("google-spreadsheet");
const keys = require("./pheelshionshow/pheelshionshow-e7a06d2b81bf.json");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async function handler(req, res) {
  const {
    query: { name },
  } = req;

  try {
    if (!name) {
      throw new Error();
    }
    res
      .status(200)
      .json({ message: "A ok!", data: `Hello ${name} from the server` });
  } catch (error) {
    res.status(500).json(error);
  }
}
