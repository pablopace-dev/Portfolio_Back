const express = require('express');
const router = express.Router();

const { createVisit } = require('../controllers/controllerVisit');


router.post('/', createVisit);


module.exports = router;
