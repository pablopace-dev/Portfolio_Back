const Visit = require('../models/visitsModel');

/** 
 * @author Pablo
 * @exports Object
 * @module controllerVisit
 */


/**
* Crea un usuario.
* @method createVisit
* @async
* @param {Object} req Es el requerimiento que proviene de las rutas, necesita en el
body: name, ip y page.
* @param {Object} res Es la respuesta que proviene de las rutas 
* @returns {json} Devuelve OK, msg y user, que es un json de tipo User
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
    createVisit
}