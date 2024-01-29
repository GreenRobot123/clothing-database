const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "clothing_database",
  password: "root",
  port: 5432,
});

const getClothesData = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM clothes", (error, results) => {
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

const addClothes = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, color, size, stock, price } = body;
    pool.query(
      "INSERT INTO clothes (name, color, size, stock, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, color, size, stock, price],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new article of clothing has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const deleteClothes = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM clothes WHERE clothes_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Clothes deleted with ID: ${id}`);
      }
    );
  });
};

const updateClothes = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, color, size, stock, price } = body;
    pool.query(
      "UPDATE clothes SET name = $1, color = $2, size = $3, stock = $4, price = $5 WHERE clothes_id = $6 RETURNING *",
      [name, color, size, stock, price, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Clothes updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

module.exports = {
  getClothesData,
  addClothes,
  deleteClothes,
  updateClothes,
};
