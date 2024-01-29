import React, { useState, useCallback, useEffect } from "react";
import "./home.scss";
import { PieChart, Series, Label, Connector } from "devextreme-react/pie-chart";

export default function Home() {
  const [clothes, setClothes] = useState({});

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
  }, []);

  const customizeText = (pointInfo) => {
    return pointInfo.value;
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Home</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <PieChart
            dataSource={clothes}
            type="doughnut"
            title="Pie Chart based on Current Stock"
          >
            <Series argumentField="name" valueField="stock">
              <Label
                visible={true}
                position="columns"
                customizeText={customizeText}
              >
                <Connector visible={true}></Connector>
              </Label>
            </Series>
          </PieChart>
          <p>Clothing Database UI</p>
          <p>
            <span>This application was built using </span>
            <a
              href={"https://create-react-app.dev/"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Create React App
            </a>
            <span> and </span>
            <a
              href={
                "https://js.devexpress.com/Documentation/Guide/Common/DevExtreme_CLI/"
              }
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              DevExtreme CLI
            </a>
            <span> and includes the following DevExtreme components:</span>
          </p>
          <ul>
            <li>
              <a
                href={
                  "https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                DataGrid
              </a>
            </li>
            <li>
              <a
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Form/Overview/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Form
              </a>
            </li>
            <li>
              <a
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Drawer/Getting_Started_with_Navigation_Drawer/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Drawer
              </a>
            </li>
          </ul>

          <p>
            To add new clothes data to database. Click the Navigation Bar on the
            Left and Select Form. Input the Data and Submit.
          </p>

          <p>
            <span>WIP.</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
