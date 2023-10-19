//suposed that we use PostgresSQL and built a connector Pool
// const {Pool} = require('pg');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//build a PostgresSQL connector
// const pool = new Pool({
//   user: "?????",
//   host: "??????",
//   database: "???????",
//   password: "??????",
//   port: 5432,
// });

//get userProfile by ID
const getUserProfileById = async (userId) => {
  try {
    // * need to modify to [column1,column2,~~~]
    // supposed the table called "users"
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      //supposed there just one user
      return result.rows[0];
    } else {
      //there is no user by the ID
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const get = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const create = async (email, password, username) => {
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return user;
};

const update = async () => {};

module.exports = {
  getUserProfileById,
  get,
  create,
  update,
};
