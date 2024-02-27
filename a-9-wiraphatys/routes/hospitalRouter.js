const express = require('express');
const router = express.Router();
const appointmentRouter = require('./appointmentRouter')

const { 
    getHospitals, 
    getHospital, 
    createHospital, 
    updateHospital, 
    deleteHospital,
    getVacCenters
} = require('../controllers/hospitalController')

const { 
    protect, 
    authorize 
} = require('../middleware/authMiddleware')

router.route('/vacCenters').get(getVacCenters)

router.route('/').get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize("admin"), updateHospital).delete(protect, authorize("admin"), deleteHospital);

router.use('/:hospitalId/appointments', appointmentRouter)

module.exports = router