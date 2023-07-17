const Visit = require('../models/visitsModel');
const { sendError } = require('./controllerMailer');

/** 
 * @author Pablo
 * @exports Object
 * @module controllerVisit
 */


const checkDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
}

/**
* Devuelve todos las visitas.
* @method getVisits
* @async
* @param {Object} req Es el requerimiento que proviene de las rutas
* @param {Object} res Es la respuesta que proviene de las rutas 
* @returns {json} Devuelve OK y msg 
* @throws {json} Devuelve el error
*/
const getVisits = async (req, res) => {

    try {

        const visits = await Visit.find();

        if (visits.length == 0)
            return res.status(200).json({
                ok: true,
                msg: 'No hay visitas en la bbdd.',
                data: []
            });

        return res.status(200).json({
            ok: true,
            msg: 'Visitas encontradas con éxito',
            length: visits.length,
            last: visits[visits.length - 1],
            data: visits.sort(checkDates).slice(0, 5)
        });

    } catch (e) {
        console.log('getVisits error:', e);

        return res.status(404).json({
            ok: false,
            msg: 'Error getVisits: fallo al intentar recuperar todas las visitas',
            error: e
        });

    };
};



/**
* Crea una visita nueva.
* @method createVisit
* @async
* @param {Object} req Es el requerimiento que proviene de las rutas, necesita en el
body: name, ip y page.
* @param {Object} res Es la respuesta que proviene de las rutas 
* @returns {json} Devuelve OK y msg 
* @throws {json} Devuelve el error
*/
const createVisit = async (req, res) => {

    try {

        const visit = new Visit(req.body);
        await visit.save();

        return res.status(201).json({
            ok: true,
            msg: 'Visita registrada con éxito'
        });

    } catch (e) {
        console.log('createVisit error:', e);
        sendError(e);

        return res.status(500).json({
            ok: false,
            msg: 'createVisit: Ha habido un fallo al crear la visita.',
            error: e
        });

    };
};


module.exports = {
    createVisit,
    getVisits
}