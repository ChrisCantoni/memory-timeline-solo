const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route
router.get('/', (req, res) => {
  console.log('The Search params are', req.query.q)
  let searchTerm = "%" + req.query.q + "%";
  if (req.query.q == undefined) {
    console.log('Normal GET function');
  queryText = `SELECT "post".*, "timeline"."title" FROM "post" 
  JOIN "timeline" ON "post"."timeline_id" = "timeline"."id"
  WHERE "post"."user_id" = $1 AND "timeline"."visible" = true ORDER BY "date";`;
  pool.query(queryText, [req.user.id])
  .then((result) => {
    console.log('GET successful')
    res.send(result.rows)
  }).catch((error) => {
    console.log('GET error', error)
    res.sendStatus(500);
  })}
  else {
    queryText = `SELECT "post".*, "timeline"."title"  FROM "post"
    JOIN "timeline" ON "post"."timeline_id" = "timeline"."id"
    WHERE "post"."user_id" = $1 AND "timeline"."visible" = true  AND 
    "post"."post_title" ILIKE $2 OR "media_url" ILIKE $2 OR "notes" ILIKE $2 ORDER BY "date";`;
  pool.query(queryText, [req.user.id, searchTerm])
  .then((result) => {
    console.log('GET successful')
    res.send(result.rows)
  }).catch((error) => {
    console.log('GET error', error)
    res.sendStatus(500);
  })}
  }
);

// GET Details Route
router.get('/details/:id', (req, res) => {
    queryText = `SELECT "post".*, "timeline"."title" AS "timeline_title" FROM "post"
    JOIN "timeline" ON "timeline"."id" = "post"."timeline_id"
    WHERE "post"."user_id" = $1 AND "post"."id" = $2;`;
    pool.query(queryText, [req.user.id, req.params.id])
    .then((result) => {
        console.log('GET details success')
        res.send(result.rows.length > 0 ? result.rows[0] : {})
    }).catch((error) => {
        console.error('GET details error', error)
        res.sendStatus(500);
    })
})

// POST Route
router.post('/', (req, res) => {
    if (req.body.notes === '') {
  queryText = `INSERT INTO "post" ("post_title", "media_url", "date", "date_created", "user_id", "timeline_id")
  VALUES (
    $1, $2, $3, CURRENT_TIMESTAMP, $4, $5
  );`
  pool.query(queryText, [req.body.title, req.body.description, req.body.date, req.user.id, req.body.timeline])
  .then((result) => {
    res.sendStatus(201)
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  })}
  else {
    queryText = `INSERT INTO "post" ("title", "media_url", "notes", "date", "date_created", "user_id", "timeline_id")
  VALUES (
    $1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6
  );`
  pool.query(queryText, [req.body.title, req.body.description, req.body.notes, req.body.date, req.user.id, req.body.timeline])
  .then((result) => {
    res.sendStatus(201)
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  })
  }
});

// PUT Route
router.put('/:id', (req, res) => {
    console.log('Req Body', req.body)
    let queryText = `UPDATE "post"
    SET "title" = $1, "media_url" = $2, "notes" = $3
    WHERE "id" = $4 AND "user_id" = $5;
    `;
    pool.query(queryText, [req.body.title, req.body.media_url, req.body.notes, req.params.id, req.user.id])
    .then((result) => {
        console.log('put request made')
        res.sendStatus(201)
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    })
})


// DELETE route
router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "post" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.error('deletion error', err)
        res.sendStatus(500)
    })
})


module.exports = router;
