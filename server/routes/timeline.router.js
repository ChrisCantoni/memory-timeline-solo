const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  queryText = `SELECT * FROM "timeline"
  WHERE "user_id" = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    console.log('GET timeline success')
    res.send(result.rows);
  }).catch((err) => {
    console.log('GET timeline error', err)
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
