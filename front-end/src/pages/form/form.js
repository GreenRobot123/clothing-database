import React, { useCallback, useState } from "react";
import "./form.scss";
import { Form, SimpleItem, ButtonItem } from "devextreme-react/form";
import { getClothes, getSize } from "../data.js";

const new_clothes = getClothes();

const submitButtonOptions = {
  text: "ADD",
  useSubmitBehavior: true,
};

const validationRules = {
  name: [{ type: "required", message: "Name is required." }],
  color: [
    {
      type: "required",
      message: "Color is required.",
    },
    {
      type: "pattern",
      pattern: /^[a-zA-Z]+$/,
      message: "Color should be alphabetic.",
    },
  ],
  stock: [
    { type: "required", message: "Stock is required." },
    {
      type: "pattern",
      pattern: /^\d+$/,
      message: "Stock should be an integer.",
    },
  ],
  price: [
    { type: "required", message: "Price is required." },
    {
      type: "pattern",
      pattern: /[+-]?([0-9]*[.])?[0-9]+/,
      message: "Price should be a number.",
    },
  ],
};

const App = () => {
  const [clothes, setClothes] = useState({});

  const sizeEditorOptions = {
    items: getSize(),
    searchEnabled: true,
    value: clothes.size,
    onValueChanged: (e) =>
      setClothes((prevClothes) => ({
        ...prevClothes,
        size: e.value,
      })),
  };

  const getClothes = useCallback(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setClothes((prevClothes) => ({
          ...prevClothes,
          ...data.clothes,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addClothes = useCallback(
    (formData) => {
      fetch("http://localhost:3001/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          alert(data);
          getClothes();
        })
        .catch((error) => {
          console.error("Error adding clothes:", error);
        });
    },
    [getClothes]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addClothes(clothes);
    },
    [addClothes, clothes]
  );

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Add Clothes</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <form action="/employee-page" onSubmit={handleSubmit}>
            <Form clothes={new_clothes} colCount={"auto"}>
              <SimpleItem
                dataField="name"
                validationRules={validationRules.name}
                editorOptions={{
                  onValueChanged: (e) =>
                    setClothes((prevClothes) => ({
                      ...prevClothes,
                      name: e.value,
                    })),
                }}
              />
              <SimpleItem
                dataField="color"
                validationRules={validationRules.color}
                editorOptions={{
                  onValueChanged: (e) =>
                    setClothes((prevClothes) => ({
                      ...prevClothes,
                      color: e.value,
                    })),
                }}
              />
              <SimpleItem
                dataField="size"
                isRequired={true}
                editorType="dxSelectBox"
                editorOptions={sizeEditorOptions}
              />
              <SimpleItem
                dataField="stock"
                validationRules={validationRules.stock}
                editorOptions={{
                  onValueChanged: (e) =>
                    setClothes((prevClothes) => ({
                      ...prevClothes,
                      stock: e.value,
                    })),
                }}
              />
              <SimpleItem
                dataField="price"
                validationRules={validationRules.price}
                editorOptions={{
                  onValueChanged: (e) =>
                    setClothes((prevClothes) => ({
                      ...prevClothes,
                      price: e.value,
                    })),
                }}
              />
              <ButtonItem buttonOptions={submitButtonOptions} />
            </Form>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
