
// @desc    get all hospitals
// @route   GET /api/v1/hospitals/
// @access  Public
exports.getHospitals = ((req, res, next) => {
    res.status(200).send({
        status: "success",
        message: "show all data"
    })
})

// @desc    get single hospital by id
// @route   GET /api/v1/hospitals/:id
// @access  Public
exports.getHospital = ((req, res, next) => {
    res.status(200).send({
        status: "success",
        message: `show data id = ${req.params.id}`
    })
})

// @desc    create a new hospital
// @route   POST /api/v1/hospitals/
// @access  Private
exports.createHospital = ((req, res, next) => {
    res.status(200).send({
        status: "success",
        message: "create new hospitals"
    })
})

// @desc    update a exist hospital by id
// @route   PUT POST /api/v1/hospitals/:id
// @access  Private
exports.updateHospital = ((req, res, next) => {
    res.status(200).send({
        status: "success",
        message: `updated data id = ${req.params.id}`
    })
})

// @desc    delete a exist hospital by id
// @route   DELETE POST /api/v1/hospitals/:id
// @access  Private
exports.deleteHospital = ((req, res, next) => {
    res.status(200).send({
        status: "success",
        message: `deleted data id = ${req.params.id}`
    })
})