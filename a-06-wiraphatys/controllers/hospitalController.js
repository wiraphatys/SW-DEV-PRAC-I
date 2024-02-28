const Hospital = require('../models/HospitalModel');

// @desc    get all hospitals
// @route   GET /api/v1/hospitals/
// @access  Public
exports.getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find({});
        res.status(200).send({
            success: true,
            count: hospitals.length,
            data: hospitals
        });
    } catch (e) {
        res.status(400).send({
            success: false
        });
    }
};

// @desc    get single hospital by id
// @route   GET /api/v1/hospitals/:id
// @access  Public
exports.getHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(400).send({
                success: false
            });
        }
        res.status(200).send({
            success: true,
            data: hospital
        });
    } catch (e) {
        res.status(400).send({
            success: false
        });
    }
};

// @desc    create a new hospital
// @route   POST /api/v1/hospitals/
// @access  Private
exports.createHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).send({
            success: true,
            data: hospital
        });
    } catch (e) {
        res.status(400).send({
            success: false
        });
    }
};

// @desc    update an existing hospital by id
// @route   PUT /api/v1/hospitals/:id
// @access  Private
exports.updateHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!hospital) {
            return res.status(400).send({
                success: false
            });
        }

        res.status(200).send({
            success: true,
            data: hospital
        });
    } catch (e) {
        res.status(400).send({
            success: false
        });
    }
};

// @desc    delete an existing hospital by id
// @route   DELETE /api/v1/hospitals/:id
// @access  Private
exports.deleteHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);

        if (!hospital) {
            return res.status(400).send({
                success: false
            });
        }

        res.status(200).send({
            success: true,
            data: {}
        });
    } catch (e) {
        res.status(400).send({
            success: false
        });
    }
};
