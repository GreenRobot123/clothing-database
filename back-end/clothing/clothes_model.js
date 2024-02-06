const { Pool } = require("pg");

const connectionString =
  "postgres://untimaug:VQdB62E2JcmSt0SJh5jHfZWt02sLueXO@rosie.db.elephantsql.com/untimaug";

const pool = new Pool({
  connectionString: connectionString,
  max: 20,
});

const getClothesData = async () => {
  let client;
  try {
    client = await pool.connect();
    const results = await client.query("SELECT * FROM clothes");
    return results.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  } finally {
    if (client) {
      client.release();
    }
  }
};

const addClothes = (body) => {
  const { name, color, size, stock, price } = body;
  const query =
    "INSERT INTO clothes (name, color, size, stock, price) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [name, color, size, stock, price];
  let client;

  return pool
    .query(query, values)
    .then((results) => {
      return `A new article of clothing has been added: ${JSON.stringify(
        results.rows[0]
      )}`;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Internal server error");
    });
};

const deleteClothes = (id) => {
  const query = "DELETE FROM clothes WHERE clothes_id = $1";
  const values = [id];

  return pool
    .query(query, values)
    .then(() => {
      return `Clothes deleted with ID: ${id}`;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Internal server error");
    });
};

const updateClothes = (id, body) => {
  const { name, color, size, stock, price } = body;
  const query =
    "UPDATE clothes SET name = $1, color = $2, size = $3, stock = $4, price = $5 WHERE clothes_id = $6 RETURNING *";
  const values = [name, color, size, stock, price, id];

  return pool
    .query(query, values)
    .then((results) => {
      return `Clothes updated: ${JSON.stringify(results.rows[0])}`;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Internal server error");
    });
};

module.exports = {
  getClothesData,
  addClothes,
  deleteClothes,
  updateClothes,
};
