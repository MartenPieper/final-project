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


exports.getUserPic = id => {
    return db.query(
        `SELECT *
         FROM accounts
         WHERE id = $1`,
        [id]
    );
};

exports.uploadBio = (id, bio) => {
    return db.query(
         `UPDATE accounts
         SET bio = $2
         WHERE id = $1
         RETURNING id, bio`,
         [id, bio]
    );
}

exports.uploadProfilePic = (id, profilepic) => {
    return db.query(
         `UPDATE accounts
         SET profilepic = $2
         WHERE id = $1
         RETURNING id, profilepic`,
         [id, profilepic]
    );
};
