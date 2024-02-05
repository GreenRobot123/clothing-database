import React, { useState, useCallback, useEffect } from "react";
import "./home.scss";
import PieChart, {
  Series,
  Label,
  Export,
  Legend,
  Font,
  Connector,
} from "devextreme-react/pie-chart";

function pointClickHandler(e) {
  toggleVisibility(e.target);
}
function legendClickHandler(e) {
  const arg = e.target;
  const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
  toggleVisibility(item);
}
function toggleVisibility(item) {
  item.isVisible() ? item.hide() : item.show();
}

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
    return `${pointInfo.valueText} (${pointInfo.percentText})`;
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Home</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <PieChart
            dataSource={clothes}
            palette="Material"
            title="Pie Chart based on Current Stock"
            onPointClick={pointClickHandler}
            onLegendClick={legendClickHandler}
          >
            <Series argumentField="name" valueField="stock">
              <Label
                visible={true}
                position="columns"
                customizeText={customizeText}
              >
                <Font size={16} />
                <Connector visible={true} width={0.5} />
              </Label>
            </Series>
            <Export enabled={true} />
            <Legend
              verticalAlignment="bottom"
              horizontalAlignment="center"
              itemTextPosition="right"
              rowCount={2}
            />
          </PieChart>
          <h2>Clothing Database UI</h2>
          <p>
            Welcome to the Clothing Database UI, a user-friendly application
            designed to manage and organize your clothing data effortlessly.{" "}
          </p>
          <h2>Project Overview</h2>
          <p>
            This application has been crafted using Create React App and
            DevExtreme CLI, leveraging the power of DevExtreme components to
            provide a seamless user experience. The key components include:
            DataGrid: View and manage your clothing database in a tabular
            format. Form: Easily input new clothing data with a user-friendly
            form. Drawer: Access additional features conveniently through the
            side navigation drawer.
          </p>
          <h2>How to Add New Clothes:</h2>
          <p>
            To add new clothing data to the database, follow these simple steps:
            Navigate: Click on the Navigation Bar located on the left side of
            the screen. Select Form: From the options available, choose the Form
            option. Input Data: Fill in the required details for the new
            clothing item. Submit: Click the submit button to add the data to
            your database.
          </p>
          <h2>Explore Your Data:</h2>
          <p>
            The DataGrid showcases all your clothing data, providing a
            comprehensive view that includes the name, price, stock, size, id,
            and color of each item. Easily manage and organize your collection
            with this intuitive interface.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
