const Pool = require("pg").Pool;

const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "clothing_database",
  password: "root",
  port: 5432,
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
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM user_data", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

const getUserDataById = async (UserID) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM user_data WHERE user_id = $1",
        [UserID],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows.length > 0) {
            resolve(results.rows[0]);
          } else {
            reject(new Error("No user found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
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
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Internal server error");
  }
};

const addUser = (body) => {
  return new Promise(function (resolve, reject) {
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
    pool.query(
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
      ],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new user has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM user_data WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`User deleted with ID: ${id}`);
      }
    );
  });
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
    throw error;
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
