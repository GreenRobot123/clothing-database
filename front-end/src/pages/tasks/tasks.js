import React, { useState, useEffect, useCallback } from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
} from "devextreme-react/data-grid";
import { getSize } from "../data.js";

export default function Task() {
  const [clothes, setClothes] = useState([]);

  const sizeEditorOptions = {
    items: getSize(),
    value: clothes.size,
    searchEnabled: true,
  };

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

  const deleteClothes = useCallback(
    (key) => {
      fetch(`http://localhost:3001/clothes/${key}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          alert(data);
          getClothes();
        })
        .catch((error) => {
          console.error("Error deleting clothes:", error);
        });
    },
    [getClothes]
  );

  const updateClothes = useCallback(
    (e) => {
      fetch(`http://localhost:3001/clothes/${e.key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.data),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          alert(result);
          getClothes();
        })
        .catch((error) => {
          console.error("Error updating clothes:", error);
        });
    },
    [getClothes]
  );

  const handleRowRemoving = (e) => {
    deleteClothes(e.key);
  };

  const handleRowUpdated = (e) => {
    updateClothes(e);
  };

  const handleRowInserting = (e) => {
    e.cancel = true;
  };

  const handleAddButtonClick = (e) => {
    window.location.href = "http://localhost:3000/#/form";
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Clothes Data</h2>

      <DataGrid
        className={"dx-card wide-card"}
        dataSource={clothes}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        keyExpr="clothes_id"
        onRowRemoved={handleRowRemoving}
        onRowUpdated={handleRowUpdated}
        onRowInserting={handleRowInserting}
        onToolbarPreparing={(e) => {
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              text: "Add",
              icon: "plus",
              onClick: handleAddButtonClick,
            },
          });
        }}
      >
        <Editing
          mode="popup"
          allowDeleting={true}
          allowUpdating={true}
          form={{
            items: [
              {
                dataField: "clothes_id",
                caption: "ID",
                editorOptions: { readOnly: true },
              },
              {
                dataField: "name",
                caption: "Name",
              },
              {
                dataField: "color",
                caption: "Color",
              },
              {
                dataField: "size",
                caption: "Size",
                editorType: "dxSelectBox",
                editorOptions: sizeEditorOptions,
              },
              {
                dataField: "stock",
                caption: "Stock",
              },
              {
                dataField: "price",
                caption: "Price",
              },
            ],
          }}
        />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={"clothes_id"} caption={"ID"} width={100} />
        <Column dataField={"name"} caption={"Name"} />
        <Column dataField={"color"} caption={"Color"} />
        <Column dataField={"size"} caption={"Size"} />
        <Column dataField={"stock"} caption={"Stock"} />
        <Column dataField={"price"} caption={"Price"} />
      </DataGrid>
    </React.Fragment>
  );
}
