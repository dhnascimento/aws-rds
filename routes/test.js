const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/api/test", (req, res) => {
    db.query(
      `
    SELECT *
    FROM events; `
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
  return router;
};
