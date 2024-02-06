const { Pool } = require("pg");

const connectionString =
  "postgres://untimaug:VQdB62E2JcmSt0SJh5jHfZWt02sLueXO@rosie.db.elephantsql.com/untimaug";

const pool = new Pool({
  connectionString: connectionString,
  max: 20,
});

const role = "user";
const last_login_date = new Date();

async function checkEmailExists(email) {
  try {
    const userWithEmail = await getUserByEmail(email);
    return userWithEmail !== null;
  } catch (error) {
    throw error;
  }
}

const getUserData = async () => {
  try {
    const results = await pool.query("SELECT * FROM user_data");
    return results.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const getUserDataById = async (UserID) => {
  try {
    const results = await pool.query(
      "SELECT * FROM user_data WHERE user_id = $1",
      [UserID]
    );
    if (results.rows.length > 0) {
      return results.rows[0];
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const getUserByEmail = async (email) => {
  try {
    const results = await pool.query(
      "SELECT * FROM user_data WHERE email = $1",
      [email]
    );
    if (results.rows.length > 0) {
      return results.rows[0];
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const addUser = async (body) => {
  try {
    const {
      first_name,
      last_name,
      password,
      email,
      avatar_url,
      date_of_birth,
      address,
      phone_number,
      notes,
      creation_date,
    } = body;

    const results = await pool.query(
      "INSERT INTO user_data (first_name, last_name, email, password, avatar_url, date_of_birth, address, phone_number, notes, creation_date, last_login_date, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        first_name,
        last_name,
        email,
        password,
        avatar_url,
        date_of_birth,
        address,
        phone_number,
        notes,
        creation_date,
        last_login_date,
        role,
      ]
    );

    if (results && results.rows) {
      return `A new user has been added: ${JSON.stringify(results.rows[0])}`;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const deleteUser = async (id) => {
  try {
    const results = await pool.query(
      "DELETE FROM user_data WHERE user_id = $1",
      [id]
    );
    return `User deleted with ID: ${id}`;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

const updateUser = async (id, body) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      avatar_url,
      date_of_birth,
      address,
      phone_number,
      notes,
      creation_date,
    } = body;

    const results = await pool.query(
      "UPDATE user_data SET first_name = $1, last_name = $2, email = $3, password = $4, avatar_url = $5, date_of_birth = $6, address = $7, phone_number = $8, notes = $9, creation_date = $10, last_login_date = $11, role = $12 WHERE user_id = $13 RETURNING *",
      [
        first_name,
        last_name,
        email,
        password,
        avatar_url,
        date_of_birth,
        address,
        phone_number,
        notes,
        creation_date,
        last_login_date,
        role,
        id,
      ]
    );

    if (results && results.rows) {
      return `User updated: ${JSON.stringify(results.rows[0])}`;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getUserData,
  getUserDataById,
  addUser,
  deleteUser,
  updateUser,
  checkEmailExists,
  getUserByEmail,
};
