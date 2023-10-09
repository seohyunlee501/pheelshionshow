import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";

const SPREADSHEET_ID = "1uoJrvQvnShrF9tphqFhSr2v0xCwELfJIvXV_izn5J2Y";

function HomePage() {
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const handleZoomMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleZoomName = (name) => {
    setSelectedName(name);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setSelectedName(null);
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

  const ROW_WIDTH = 360; // Adjust the row width as needed
  const ITEM_WIDTH = 120; // Adjust the item width as needed

  const MAX_RANDOM_OFFSET_X = 10; // Maximum random offset for X position
  const MAX_RANDOM_OFFSET_Y = 10; // Maximum random offset for Y position
  const MAX_RANDOM_ROTATION = 20; // Maximum random rotation angle in degrees

  // // Calculate the number of items per row
  const itemsPerRow = Math.floor(ROW_WIDTH / ITEM_WIDTH);
  // const itemsPerRow = 3;

  return (
    //<div className="bg-scroll pt-100">
    <div>
      <div className="pt-32 flex flex-wrap">
        {" "}
        {/* Add margin to ensure messages appear below the header */}
        {data.map((item, index) => {
          const rowIndex = Math.floor(index / itemsPerRow);
          const columnIndex = index % itemsPerRow;

          // Apply the random offsets to the fixed position
          const finalX =
            ((columnIndex % 2) - (rowIndex % 2)) * MAX_RANDOM_OFFSET_X;

          const finalY =
            ((columnIndex % 2) - (rowIndex % 2) + 1) * MAX_RANDOM_OFFSET_Y - 20;

          // Generate a random rotation angle
          const randomRotation =
            ((rowIndex + columnIndex + 1) *
              MAX_RANDOM_ROTATION *
              (-1) ** (rowIndex + columnIndex)) %
            25;

          return (
            <span
              key={index}
              onClick={() => {
                handleZoomMessage(item.message);
                handleZoomName(item.name);
              }}
              style={{
                cursor: "pointer",
                position: "relative",
                left: `${finalX}px`, // Apply random x coordinate
                top: `${finalY}px`, // Apply random y coordinate
              }}
              className="inline-block w-24 h-24 m-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 138 135"
                fill="none"
                style={{
                  transform: `rotate(${randomRotation}deg)`, // Apply random rotation
                }}
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
                <text
                  x="50%" // Center horizontally
                  y="55%" // Center vertically
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="18" // Adjust font size as needed
                  fill="black" // Text color
                  fontWeight={600}
                >
                  {item.name}
                </text>
              </svg>
            </span>
          );
        })}
        {/* Render modal when a message is clicked */}
        {selectedMessage && selectedName && (
          <ModalComponent
            isOpen={!!selectedMessage}
            onClose={closeModal}
            message={selectedMessage}
            name={selectedName}
          />
        )}
      </div>
      <div className="h-4" />
      <Header className="fixed top-0 left-0" />
    </div>

    //</div>
  );
}

export default HomePage;
