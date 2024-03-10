const fs = require('fs');
const path = require('path');
const validator = require('validator');
const Products = require('../database/model/product.model');

const createProduct = async ( req, res) =>{
    let params = req.body;

    try{
        let validarName = !validator.isEmpty(params.name) && 
        validator.isLength(params.name,{min:5, max:25});
    }catch(error){

    }
}