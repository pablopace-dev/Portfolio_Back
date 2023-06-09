const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.use(express.urlencoded({ extended: false }));   // Parse application/x-www-form-urlencoded
app.use(express.json());                             // Parse application/json

//Rutas
app.use('/api/mail', require('./routers/routerMailer'));         //Mailer


//Awake
app.use('/wakeup', (req, res) => {

    console.log(`I'm awake (Portfolio - Back)`);

    res.status(200).json({
        ok: true,
        msg: `I'm awake (Portfolio - Back)`
    });

});

//404
app.use((req, res) => { res.status(404).send({ msg: `Ruta no encontrada: ${req.url}` }); });


//Listener
app.listen(port, () => console.log(`Server listenning on port ${port}..`));