const express = require('express')
 
const { user }  = require('./../controllers')
const { createController, findManyController, findOneController, updateController, deleteController, countController, duplicateController } = user
 
const router = express.Router()

const resource = 'user'
 
router.get(`/${resource}/:id`, findOneController)
router.get(`/${resource}/`, findManyController)
router.post(`/${resource}`, createController)
router.put(`/${resource}/:id`, updateController) 
router.delete(`/${resource}/:id`, deleteController) 
router.get(`/${resource}Count`, countController) 
router.post(`/${resource}Duplicate`, duplicateController) 

module.exports = router