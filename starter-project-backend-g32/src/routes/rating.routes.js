const express = require('express')
const router = express.Router()
const ratingController = require('../controllers/rating.controller')


router.route('/').get(ratingController.getMany)
router.route('/').post(ratingController.createOne)

router.route('/:id').get(ratingController.getOne)
router.route('/:id').put(ratingController.updateOne)
router.route('/:id').delete(ratingController.removeOne)

module.exports = router