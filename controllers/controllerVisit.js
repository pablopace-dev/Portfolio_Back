const Visit = require('../models/visitsModel');
const { sendError } = require('./controllerMailer');

/** 
 * @author Pablo
 * @exports Object
 * @module controllerVisit
 */


const checkDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
};



const processData = dataVisits => {

    const newVisits = [];

    dataVisits.forEach(vis => {

        const date = new Date(vis.date).toLocaleString('es-ES', { dateStyle: 'long' });
        // console.log('date', date);

        const oldInd = newVisits.findIndex(el => el.date === date);
        let newInd = -1, ipInd = -1;

        if (oldInd != -1) {

            ipInd = newVisits[oldInd].ips.findIndex(el => el.ip === vis.ip);
            // console.log('ipInd', ipInd, vis.date);

            if (ipInd != -1)
                newVisits[oldInd].ips[ipInd].logs.push(vis.city ?
                    {
                        event: 'Visit',
                        date: vis.date
                    } :
                    {
                        event: vis.event,
                        devMode: vis.devMode,
                        lang: vis.lang,
                        date: vis.date
                    });

            else
                newVisits[oldInd].ips.push({
                    ip: vis.ip, logs: [vis.city ?
                        {
                            event: 'Visit',
                            date: vis.date
                        } :
                        {
                            event: vis.event,
                            devMode: vis.devMode,
                            lang: vis.lang,
                            date: vis.date
                        }]
                });

        } else {

            newVisits.push({ date, ips: [] });
            newInd = newVisits.length - 1;
            newVisits[newInd].ips.push({ ip: vis.ip });

            newVisits[newInd].ips[newVisits[newInd].ips.length - 1].logs = [(vis.city ?
                {
                    event: 'Visit',
                    date: vis.date
                } :
                {
                    event: vis.event,
                    devMode: vis.devMode,
                    lang: vis.lang,
                    date: vis.date
                })
            ];

        }

        const index = oldInd === -1 ? newInd : oldInd;
        const ipIndex = ipInd === -1 ? newVisits[index].ips.length - 1 : ipInd;
        // console.log('index', index, 'ipIndex', ipIndex);

        if (vis.org && !newVisits[index].ips[ipIndex].city) {

            const { city, region, country_name, ip, org, postal, latitude, longitude } = vis;

            newVisits[index].ips[ipIndex] = {
                ...newVisits[index].ips[ipIndex],
                city, region, country_name, ip, org, postal, latitude, longitude
            };

            // console.log('newV', newVisits);
        }


    });

    // console.log('nV', newVisits);
    return newVisits;
};

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

        const newVisits = processData(visits.sort(checkDates));

        return res.status(200).json({
            ok: true,
            msg: 'Visitas encontradas con éxito',
            length: visits.length,
            last: visits[0],
            data: newVisits
            // data: visits.sort(checkDates).slice(0, 5)
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