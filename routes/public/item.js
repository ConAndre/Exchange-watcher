const express = require('express');
const router = express.Router();
const { getFromOfficialAPI } = require('osrs-trade-stats');

router.get('/:id', async function (req, res, next) {
  try {
    res.json(await getFromOfficialAPI(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;