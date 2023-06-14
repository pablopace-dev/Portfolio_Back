const express = require('express');
const router = express.Router();

const {
    createVisit,
    getVisits } = require('../controllers/controllerVisit');


router.get('/', getVisits);

router.post('/', createVisit);


module.exports = router;
