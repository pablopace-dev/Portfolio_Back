const express = require('express');
const router = express.Router();

const {
    sendEmail
} = require('../controllers/controllerMailer');


router.post('/', sendEmail);


router.get('/wakeup', (req, res) => {

    res.status(200).json({
        ok: true,
        msg: `I'm awake (Portfolio - Back)`
    });

});


module.exports = router;