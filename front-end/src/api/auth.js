import defaultUser from "../utils/default-user";

let authenticatedUser = undefined;
// get autheticatedUser from localStorage if rememberpassword was set

export async function signIn(email, password) {
  try {
    const emailCheckResponse = await fetch(
      `http://localhost:3002/check_email/${email}`
    );

    if (!emailCheckResponse.ok) {
      throw new Error(`Email not found! Please create a new account`);
    }

    const userDataResponse = await fetch(
      `http://localhost:3002/user_email/${email}`
    );
    const userData = await userDataResponse.json();

    if (userData.password !== password) {
      throw new Error("Incorrect password");
    }

    authenticatedUser = userData;

    return {
      isOk: true,
      data: authenticatedUser,
    };
  } catch (error) {
    return {
      isOk: false,
      message: `Authentication failed: ${error.message}`,
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: authenticatedUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request to check if email already exists
    const emailCheckResponse = await fetch(
      `http://localhost:3002/check_email/${email}`
    );

    if (emailCheckResponse.ok) {
      throw new Error(`Same email found! Please use another email`);
    }

    const userData = {
      email: email,
      password: password,
      creation_date: new Date(),
    };

    authenticatedUser = {
      ...defaultUser,
      ...userData,
    };

    try {
      const response = await fetch("http://localhost:3002/user_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authenticatedUser),
      });

      if (response.ok) {
        console.log("New user inserted successfully!");
      } else {
        console.error("Failed to insert new user.");
      }
    } catch (error) {
      console.error("Error inserting new user:", error);
    }

    return {
      isOk: true,
      data: authenticatedUser,
    };
  } catch (error) {
    return {
      isOk: false,
      message: `Authentication failed: ${error.message}`,
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
