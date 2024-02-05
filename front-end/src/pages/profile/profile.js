import React, { useState, useCallback } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";
import { Button } from "devextreme-react/button";
import notify from "devextreme/ui/notify";

export default function Profile() {
  const { user, setUser } = useAuth();

  const initialData = {
    notes: "",
    first_name: "",
    last_name: "",
    avatar_url: user
      ? user.avatar_url
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    date_of_birth: new Date(),
    address: "",
    phone_number: "",
  };
  const [formData, setFormData] = useState({
    notes: user?.notes ?? initialData.notes,
    first_name: user?.first_name ?? initialData.first_name,
    last_name: user?.last_name ?? initialData.last_name,
    avatar_url: user?.avatar_url ?? initialData.avatar_url,
    date_of_birth: user?.date_of_birth ?? initialData.date_of_birth,
    address: user?.address ?? initialData.address,
    phone_number: user?.phone_number ?? initialData.phone_number,
    email: user.email,
    password: user.password,
    creation_date: user.creation_date,
  });

  const getUserData = useCallback(
    async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3002/user_data/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          ...data,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    [setUser]
  );

  const onFieldDataChanged = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.dataField]: e.value }));
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3002/user_data/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        getUserData(userId);
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const emailToCheck = user ? user.email : "";

      if (emailToCheck) {
        const response = await fetch(
          `http://localhost:3002/user_email/${emailToCheck}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        if (userData) {
          const userId = userData.user_id;
          await updateUser(userId, formData);
          notify(`The User Was Updated `);
        } else {
          console.log("User not found.");
        }
      } else {
        console.error("User email not available in authentication context.");
      }
    } catch (error) {
      console.error("Error handling update:", error);
    }
  };

  const formDisplayData = Object.fromEntries(
    Object.entries(formData).filter(
      ([key]) =>
        key !== "email" && key !== "password" && key !== "creation_date"
    )
  );

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Profile</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img alt={""} src={formData.avatar_url} />
        </div>
        <span>{formData.notes}</span>
      </div>

      <div className={"content-block dx-card responsive-paddings"}>
        <Form
          id={"form"}
          formData={formDisplayData}
          onFieldDataChanged={onFieldDataChanged}
          labelLocation={"top"}
          colCountByScreen={colCountByScreen}
        />
        <Button
          type="normal"
          stylingMode="contained"
          style={{
            backgroundColor: "rgb(3, 169, 244)",
            color: "rgb(255, 255, 255)",
            marginTop: "10px",
          }}
          onClick={handleUpdate}
        >
          Update User
        </Button>
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
