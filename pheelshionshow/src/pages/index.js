// pages/index.js

import React from "react";
import Header from "../components/Header";

import { useEffect, useState } from "react";

// pages/index.js
import { GoogleSpreadsheet } from "google-spreadsheet";

async function getData() {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // Assuming data is in the first sheet

  // Fetch data from the spreadsheet
  const rows = await sheet.getRows();
  return rows.map((row) => ({ name: row.name, message: row.message }));
}

function HomePage() {
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleButtonClick = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      const spreadsheetData = await getData();
      // Shuffle the data to randomize button positions
      const shuffledData = shuffleArray(spreadsheetData);
      setData(shuffledData);
    }
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div>
      <Header />
      <div>
        {data.map((item, index) => (
          <button key={index} onClick={() => handleButtonClick(item.message)}>
            {item.name}
          </button>
        ))}

        {/* Render modal when a button is clicked */}
        {selectedMessage && (
          <ModalComponent
            isOpen={!!selectedMessage}
            onClose={closeModal}
            message={selectedMessage}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
