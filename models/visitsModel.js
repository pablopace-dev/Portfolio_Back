const { strict } = require('assert');
const { Schema, model } = require('mongoose');


/** 
 * @author Pablo
 * @exports VisitSchema 
 * @module visitModels
 */


/**
 * Schema del documento de la colección Visit, de tipo VisitSchema
 */
const VisitSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    ip: {
        type: String,
        required: true,
        trim: true
    },

    page: {
        type: String,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = model('Visit', VisitSchema)