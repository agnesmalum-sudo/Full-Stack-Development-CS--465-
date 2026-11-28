const mongoose = require('mongoose');
require('../models/travlr');
const Model = mongoose.model('trips');

// GET: Retrieve all trips
const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec();

        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// GET: Retrieve a specific trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({
            code: req.params.tripCode
        }).exec();

        if (q.length === 0) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};