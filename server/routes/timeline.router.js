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
  
});

// DELETE Route
router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "timeline" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.error('deletion error', err)
        res.sendStatus(500)
    })
})


module.exports = router;
