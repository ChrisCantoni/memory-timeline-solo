const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
  let searchTerm = "%" + req.query.q + "%";
  if (req.query.q == undefined) {
    console.log('Normal GET function');
  queryText = `SELECT "post".*, "timeline"."title" FROM "post" 
  JOIN "timeline" ON "post"."timeline_id" = "timeline"."id"
  WHERE "post"."user_id" = $1 AND "timeline"."visible" = true ORDER BY "date" DESC;`;
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
    "post"."post_title" ILIKE $2 OR "media_url" ILIKE $2 OR "notes" ILIKE $2 ORDER BY "date" DESC;`;
  pool.query(queryText, [req.user.id, searchTerm])
  .then((result) => {
    console.log('GET successful')
    res.send(result.rows)
  }).catch((error) => {
    console.log('GET error', error)
    res.sendStatus(500);
  })} } else {
    res.sendStatus(401);
  }
  }
);

// GET Details Route
router.get('/details/:id', (req, res) => {
  if (req.isAuthenticated()) {
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
    })} else {
      res.sendStatus(401);
    }
})

// POST Route
router.post('/', (req, res) => {
  if(req.isAuthenticated()) {
    if (!req.body.description.includes('http')) {
  queryText = `INSERT INTO "post" ("post_title", "media_url", "date", "date_created", "user_id", "timeline_id")
  VALUES (
    $1, $2, $3, CURRENT_TIMESTAMP, $4, $5
  );`
  pool.query(queryText, [req.body.title, req.body.notes, req.body.date, req.user.id, req.body.timeline])
  .then((result) => {
    res.sendStatus(201)
  }).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  })}
  else {
    queryText = `INSERT INTO "post" ("post_title", "media_url", "notes", "date", "date_created", "user_id", "timeline_id")
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
  }} else {
    res.sendStatus(401);
  }
});

// PUT Route
router.put('/:id', (req, res) => {
  if(req.isAuthenticated()) {
    console.log('Req Body', req.body)
    let queryText = `UPDATE "post"
    SET "post_title" = $1, "media_url" = $2, "notes" = $3, "date" = $4, "timeline_id" = $5
    WHERE "id" = $6 AND "user_id" = $7;
    `;
    pool.query(queryText, [
      req.body.title, 
      req.body.media_url, 
      req.body.notes, 
      req.body.date, 
      req.body.timeline, 
      req.params.id, 
      req.user.id
    ]).then((result) => {
        console.log('put request made')
        res.sendStatus(201)
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    })} else {
      res.sendStatus(401);
    }
})


// DELETE route
router.delete('/:id', (req, res) => {
  if(req.isAuthenticated()) {
    let queryText = `DELETE FROM "post" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.error('deletion error', err)
        res.sendStatus(500)
    })} else {
      res.sendStatus(401);
    }
})


module.exports = router;
