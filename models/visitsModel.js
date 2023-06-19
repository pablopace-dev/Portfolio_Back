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

    city: {
        type: String,        
        trim: true
    },

    region: {
        type: String,        
        trim: true
    },

    country_name: {
        type: String,        
        trim: true
    },

    ip: {
        type: String,        
        trim: true
    },

    network: {
        type: String,        
        trim: true
    },

    postal: {
        type: String,
        trim: true
    },

    org: {
        type: String,
        trim: true
    },

    latitude: {        
        type: Number,
        trim: true
    },

    longitude: {        
        type: Number,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = model('Visit', VisitSchema)