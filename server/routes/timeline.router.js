const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  queryText = `SELECT * FROM "timeline"
  WHERE "user_id" = $1 ORDER BY "date_created";`;
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
    queryText = `INSERT INTO "timeline" ("title", "date_created", "user_id")
    VALUES (
      $1, $2, $3
    );`
    pool.query(queryText, [req.body.title, req.body.date, req.user.id])
    .then((result) => {
      res.sendStatus(201)
    }).catch((e) => {
      console.error(e);
      res.sendStatus(500);
    })
  });

// PUT Route
  router.put('/:id', (req, res) => {
    let queryText = `UPDATE "timeline"
    SET "visible" = NOT "visible"
    WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        console.log('put request made')
        res.sendStatus(201)
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    })
})

// DELETE Route
router.delete('/:id', (req, res) => {
  //! THIS MUST DELETE ALL POSTS WITH THE TIMELINE ID FOR IT TO WORK
    let queryText = `DELETE FROM "timeline"
      WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.error('deletion error', err)
        res.sendStatus(500)
    })
})


module.exports = router;
