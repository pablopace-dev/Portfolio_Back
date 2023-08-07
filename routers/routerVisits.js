const express = require('express');
const router = express.Router();

const {
    createVisit,
    getVisits,
    deleteVisits } = require('../controllers/controllerVisit');


router.get('/', getVisits);

router.post('/', createVisit);

router.delete('/', deleteVisits)


module.exports = router;
