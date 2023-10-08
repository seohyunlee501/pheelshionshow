import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";

const SPREADSHEET_ID = "1uoJrvQvnShrF9tphqFhSr2v0xCwELfJIvXV_izn5J2Y";

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
              sheet: "설문지 응답 시트1",
              headers: {
                "Content-Type": "application/json",
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
      <div className="mt-32 flex flex-wrap">
        {" "}
        {/* Add margin to ensure messages appear below the header */}
        {data.map((item, index) => (
          <span
            key={index}
            onClick={() => handleZoomMessage(item.message)}
            style={{
              cursor: "pointer",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="138"
              height="135"
              viewBox="0 0 138 135"
              fill="none"
            >
              <g filter="url(#filter0_d_4_34)">
                <path
                  d="M64.7931 32.5498C66.7609 29.486 71.2391 29.486 73.207 32.5498L83.2884 48.2455C83.9655 49.2997 85.0136 50.0612 86.2255 50.3794L104.268 55.1172C107.79 56.042 109.174 60.3009 106.868 63.1193L95.0561 77.5575C94.2628 78.5272 93.8624 79.7594 93.9343 81.0103L95.004 99.6341C95.2128 103.269 91.5899 105.902 88.197 104.58L70.8152 97.8073C69.6478 97.3524 68.3522 97.3524 67.1848 97.8073L49.803 104.58C46.4101 105.902 42.7872 103.269 42.996 99.6341L44.0657 81.0103C44.1376 79.7594 43.7372 78.5272 42.9438 77.5575L31.1317 63.1193C28.8259 60.3009 30.2097 56.042 33.7317 55.1172L51.7745 50.3794C52.9864 50.0612 54.0345 49.2997 54.7116 48.2455L64.7931 32.5498Z"
                  fill="#FEEAB6"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_4_34"
                  x="-0.00178528"
                  y="0.251923"
                  width="138.004"
                  height="134.674"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="15" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.996078 0 0 0 0 0.917647 0 0 0 0 0.713726 0 0 0 0.5 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4_34"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_4_34"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span>{item.name}</span>
          </span>
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
