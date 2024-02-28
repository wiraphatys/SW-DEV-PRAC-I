const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable params merging

const {
    protect,
    authorize
} = require('../middleware/authMiddleware')

const {
    getAppointments,
    getAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointmentController')

router.route('/')
    .get(protect, getAppointments)
    .post(protect, authorize("admin", "user"), addAppointment);

router.route('/:id')
    .get(protect, getAppointment)
    .put(protect, authorize("admin", "user"), updateAppointment)
    .delete(protect, authorize("admin", "user"), deleteAppointment);

module.exports = router