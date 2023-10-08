import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";

const SPREADSHEET_ID = '1uoJrvQvnShrF9tphqFhSr2v0xCwELfJIvXV_izn5J2Y'; 

function HomePage() {
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleZoomMessage = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq`,
          {
            params: {
              sheet: '설문지 응답 시트1',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          }
        );

        const jsonData = JSON.parse(response.data.substr(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const data = rows.map((row) => {
          const name = row.c[1].v;
          const message = row.c[2].v;

          return { name, message };
        });

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-16"> {/* Add margin to ensure messages appear below the header */}
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleZoomMessage(item.message)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{item.name}</p>
            <p>{item.message}</p>
          </div>
        ))}

        {/* Render modal when a message is clicked */}
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
