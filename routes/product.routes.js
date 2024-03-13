const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const Products = require('../database/model/product.model');
const productMannager = require('../productManager/ProductManager');

//routes

router.post('/createProducts',productMannager.createProduct);
router.get('/getall/:cant?',productMannager.getAll);

module.exports = router;


