import React, { useState, useEffect, useRef, useCallback } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";

export default function Profile() {
  const { user, setUser } = useAuth();
  const isInitialRender = useRef(true);

  const initialData = {
    notes: "About Me.",
    first_name: "Sandra",
    last_name: "Johnson",
    email: "sandra@example.com",
    password: "hashedPassword",
    avatar_url: user
      ? user.avatarUrl
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    date_of_birth: "1990-01-01",
    address: "4600 N Virginia Rd.",
    phone_number: "123-456-7890",
    creation_date: new Date().toISOString(),
    last_login_date: null,
    role: "user",
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
  };

  const getUserData = useCallback(() => {
    fetch("http://localhost:3002/user")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setUser((prevUser) => ({
          ...prevUser,
          ...data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [setUser]);

  const updateUser = useCallback(() => {
    fetch("http://localhost:3002/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
        getUserData();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }, [getUserData, formData]);

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
        <button onClick={updateUser}>Update User</button>
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
