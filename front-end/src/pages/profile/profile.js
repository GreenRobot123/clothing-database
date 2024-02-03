import React, { useState, useEffect, useRef, useCallback } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import { useAuth } from "../../contexts/auth";

export default function Profile() {
  const { user, setUser } = useAuth();
  const isInitialRender = useRef(true);

  const initialData = {
    notes: "I am very cool",
    first_name: "Cool",
    last_name: "Guy",
    email: "sandra@example.com",
    password: "hashedPassword",
    avatar_url: user
      ? user.avatar_url
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    date_of_birth: new Date(),
    address: "4600 N Virginia Rd.",
    phone_number: "1234567890",
    creationDate: new Date(),
  };

  const [formData, setFormData] = useState({ ...initialData });

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setUser(formData);
  }, [formData, setUser]);

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
        console.log("API Response:", data);
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

  const checkUserByEmail = async () => {
    const emailToCheck = formData.email;

    try {
      const response = await fetch("http://localhost:3002");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      const existingUser = userData.find((user) => user.email === emailToCheck);

      if (existingUser) {
        console.log("User found. Performing update...");
        await updateUser(existingUser.user_id, formData);
      } else {
        console.log("User not found. Performing insert...");
        await insertUser(formData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
        console.log("User updated successfully!");
        getUserData(userId);
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const insertUser = async (newUserData) => {
    try {
      const response = await fetch("http://localhost:3002/user_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        console.log("New user inserted successfully!");
      } else {
        console.error("Failed to insert new user.");
      }
    } catch (error) {
      console.error("Error inserting new user:", error);
    }
  };

  const handleUpdate = () => {
    console.log("Checking user by email before updating...");
    checkUserByEmail();
  };

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
          formData={formData}
          onFieldDataChanged={onFieldDataChanged}
          labelLocation={"top"}
          colCountByScreen={colCountByScreen}
        />
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            marginTop: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleUpdate}
        >
          Update User
        </button>
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
