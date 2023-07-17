const transporter = require('../configs/mailer');

/**
 * Envía un correo electrónico a mi cuenta personal desde la web del portfolio.
 * @method sendEmail
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener:
 * name: nombre del usuario que envía el correo,
 * email: correo electrónico,
 * msg: texto del mensaje.
 * @param {*} res Es la respuesta de la ruta.
 * @returns {json} OK y msg.
 * @throws {Error}
 */
const sendEmail = async ({ body }, res) => {

    try {

        const response = await transporter.sendMail({
            from: `${body.name} <${process.env.EMAIL}>`,
            to: process.env.MY_EMAIL,
            subject: `Mensaje desde Portfolio: ${body.name}`,
            html: `
                    <h1 style="color: #cf2c62; font-size: 45px; text-align: center">Pablo, tenés un nuevo mensaje!</h1>
                    <h2 style="font-size: 35px">Info:</h2>
                    <p style="font-weight: normal; font-size: 25px"><b>De: </b>${body.name}</p>
                    <p style="font-weight: normal; font-size: 25px"><b>Email: </b>${body.email}</p>
                    <p style="font-weight: normal; font-size: 25px"><b>Fecha: </b>${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'medium' })} hrs.</p>
                    <p style="font-weight: normal; font-size: 25px"><b>Mensaje: </b></p>                           
                    <p style="color: #419cf9; text-align: center; font-style: italic; font-weight: 400; font-size: 25px">${body.msg}</p>                           
                `
        });

        return res.status(200).json({
            ok: true,
            msg: 'Email enviado correctamente.'
        });

    } catch (e) {
        console.log('Error al enviar el email:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error al enviar el email',
            error: e
        });

    };
};



/**
 * Envía un correo electrónico a mi cuenta personal con el error generado.
 * @method sendError
 * @async 
 * @param {Error} e Es error a enviar.
 * @returns {json} OK y msg.
 * @throws {Error}
 */
const sendError = async (e) => {

    try {

        const response = await transporter.sendMail({
            from: `Portfolio - Back <pabli2637@gmail.com>`,
            to: process.env.MY_EMAIL,
            subject: `Error en el Back del Portfolio`,
            html: `
                    <h1 style="color: #cf2c62; font-size: 45px; text-align: center">Pablo, este es el error:</h1>
                    <h2 style="font-size: 35px">Info:</h2>                    
                    <p style="font-weight: normal; font-size: 25px"><b>Fecha: </b>${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'medium' })} hrs.</p>
                    <p style="font-weight: normal; font-size: 25px"><b>Error: </b></p>
                    <p style="color: #419cf9; text-align: center; font-style: italic; font-weight: 400; font-size: 25px">${JSON.stringify(e)}</p>                           
                `
        });

        return {
            ok: true,
            msg: 'Email con el error enviado correctamente.'
        };

    } catch (e) {
        console.log('Error al enviar el email con el error:', e);

        return {
            ok: false,
            msg: 'Error al enviar el email con el error',
            error: e
        };

    };
};


module.exports = {
    sendEmail,
    sendError
}