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
});

module.exports = router;
