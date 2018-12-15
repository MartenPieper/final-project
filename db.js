const spicedPg = require("spiced-pg");

const db = spicedPg(
  process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/studentsite"
);


// exports.getSearchUpdate = ()
exports.getUser = email => {
    return db.query(
        `SELECT *
         FROM accounts
         WHERE email = $1`,
        [email]
    );
};

exports.createLogin = (first, last, email, password) => {
  return db.query(
    `INSERT INTO accounts (first,last,email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [first || null, last || null, email || null, password || null]
  );
};
