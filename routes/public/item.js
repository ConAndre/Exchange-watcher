const express = require('express');
const router = express.Router();
const { getFromOfficialAPI } = require('osrs-trade-stats');

router.get('/:id', async function (req, res, next) {
  try {
    try {
      res.json(await getFromOfficialAPI(req.params.id));
    } catch (error) {
      throw ({ client: true, status: error.response.status, msg: error.response.statusText });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;