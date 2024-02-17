import React from "react";
import "./Dashboard.scss";
import { useState, useEffect, useCallback } from "react";
import { Card } from "devextreme-react";

export default function Dashboard() {
  const [clothes, setClothes] = useState([]);

  const getClothes = useCallback(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => {
        setClothes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    getClothes();
  }, [getClothes]);

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Dashboard</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <Card>
            <div className="title">Card Title</div>
            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
