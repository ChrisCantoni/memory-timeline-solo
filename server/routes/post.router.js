const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  queryText = `SELECT * FROM "post"
  WHERE "user_id" = 1;`;
  pool.query(queryText)
  .then((result) => {
    console.log('GET successful')
    res.send(result.rows)
  }).catch((error) => {
    console.log('GET error', error)
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  queryText = `INSERT INTO "post" ("title", "media_url", "date", "date_created", "user_id", "timeline_id")
  VALUES (
    $1, $2, $3, CURRENT_TIMESTAMP, $4, $5
  );`
  pool.query(queryText, [req.body.title, req.body.description, req.body.date, req.user.id, req.body.timeline])
  .then((result) => {
    res.sendStatus(201)
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  })
});

module.exports = router;
