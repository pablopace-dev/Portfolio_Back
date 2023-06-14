const Visit = require('../models/visitsModel');

/** 
 * @author Pablo
 * @exports Object
 * @module controllerVisit
 */



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
            data: visits,
            length: visits.length
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
* Crea un usuario.
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
        req.body.ip = req.ip;

        const visit = new Visit(req.body);
        await visit.save();

        return res.status(201).json({
            ok: true,
            msg: 'Visita creada con éxito'
        });

    } catch (e) {
        console.log('createVisit error:', e);

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