const express = require('express');
const router = express.Router();

const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitalController')

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports = router

// GET ALL
// router.get('/', (req, res) => {
//     res.status(200).send({
//         status: "success",
//         message: "show all data"
//     })
// })

// GET ONE
// router.get('/:id', (req, res) => {
//     res.status(200).send({
//         status: "success",
//         message: `show data id = ${req.params.id}`
//     })
// })

// POST
// router.post('/', (req, res) => {
//     res.status(200).send({
//         status: "success",
//         message: "create new hospitals"
//     })
// })

// PUT
// router.put('/:id', (req, res) => {
//     res.status(200).send({
//         status: "success",
//         message: `updated data id = ${req.params.id}`
//     })
// })

// DELETE
// router.delete('/:id', (req, res) => {
//     res.status(200).send({
//         status: "success",
//         message: `deleted data id = ${req.params.id}`
//     })
// })