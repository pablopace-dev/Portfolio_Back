const express = require('express');
const router = express.Router();

const {
    sendEmail
} = require('../controllers/controllerMailer');


router.post('/', sendEmail);


module.exports = router;