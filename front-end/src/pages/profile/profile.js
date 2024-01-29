import React, { useState, useEffect, useRef } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";

export default function Profile() {
  const { user, setUser } = useAuth();
  const isInitialRender = useRef(true);

  const initialData = {
    notes: "About Me.",
    firstName: "Sandra",
    lastName: "Johnson",
    prefix: "Mrs.",
    position: "Controller",
    address: "4600 N Virginia Rd.",
    picture: user
      ? user.avatarUrl
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };

  const [formData, setFormData] = useState({ ...initialData });

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setUser(formData);
  }, [formData, setUser]);

  const onFieldDataChanged = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.dataField]: e.value }));
    console.log(user);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Profile</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img alt={""} src={formData.picture} />
        </div>
        <span>{formData.notes}</span>
      </div>

      <div className={"content-block dx-card responsive-paddings"}>
        <Form
          id={"form"}
          formData={formData}
          onFieldDataChanged={onFieldDataChanged}
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
