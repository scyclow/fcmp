const { Router } = require('express');
const CleaningWeek = require('../../models/MrClean/CleaningWeek');

const router = Router();

async function currentWeek (req, res) {
  try {
    const week = await CleaningWeek.getCurrentWeek();
    res.send({ week });
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function markWeekComplete (req, res) {
  const name = req.body.name || req.params.name;

  try {
    const week = await CleaningWeek.confirmCurrentWeek(name);

    res.send({ week });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}


router.get('/getWeek', currentWeek);
router.post('/markWeekComplete/:name', markWeekComplete);


module.exports = router;
