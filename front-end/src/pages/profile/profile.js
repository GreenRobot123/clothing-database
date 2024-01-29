import React, { useState } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";

export default function Profile() {
  const [notes, setNotes] = useState("About Me.");
  const employee = {
    ID: 7,
    FirstName: "Sandra",
    LastName: "Johnson",
    Prefix: "Mrs.",
    Position: "Controller",
    Picture: "images/employees/06.png",
    BirthDate: new Date("1974/11/5"),
    HireDate: new Date("2005/05/11"),
    Notes: notes,
    Address: "4600 N Virginia Rd.",
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Profile</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img
            alt={""}
            src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
          />
        </div>
        <span>{notes}</span>
      </div>

      <div className={"content-block dx-card responsive-paddings"}>
        <Form
          id={"form"}
          defaultFormData={employee}
          onFieldDataChanged={(e) =>
            e.dataField === "Notes" && setNotes(e.value)
          }
          labelLocation={"top"}
          colCountByScreen={colCountByScreen}
        />
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
