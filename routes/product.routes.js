const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const Products = require('../database/model/product.model');
const productMannager = require('../productManager/ProductManager');
const cartMannager = require('../cartManager/cartManeger');

//routes

router.post('/createProducts',productMannager.createProduct);
router.get('/getall/:cant?',productMannager.getAll);
router.get('/product/:id',productMannager.one);
router.delete('/product/:id',productMannager.eliminate);
router.put('/product/:id',productMannager.edit);
router.post('/addCart/:id',cartMannager.addToCart);
router.get('/getCart/',cartMannager.getCart);

//routes motor de plantillas
router.get('/home', (req, res)=>{
res.render('home',{nombre: 'matias'});
})

module.exports = router;


