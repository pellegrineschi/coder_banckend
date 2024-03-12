const fs = require('fs');
const path = require('path');
const validator = require('validator');
const Products = require('../database/model/product.model');

const createProduct = async (req, res) => {
    //recoger parametros por post para guardar
    let parametro = req.body;
    //validar
    
    try {
      let validarName =
        !validator.isEmpty(parametro.name) &&
        validator.isLength(parametro.name, { min: 5, max: 25 });
      let validarPrice = !validator.isEmpty(parametro.price);
      let validarCategory = !validator.isEmpty(parametro.category);
      let validarStock = !validator.isEmpty(parametro.stock);
      if (!validarName || !validarPrice || !validarCategory || !validarStock) {
        throw new Error("no se a validado la informacion");
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        mensaje: "faltan datos",
      });
    }
  
    // crear el objeto a guardar
    const product = new Products(parametro);
  
    //guardar el articulo en la db
    try {
      const articuloGuardado = await product.save();
      return res.status(200).json({
        status: "success",
        articulo: articuloGuardado,
        mensaje: "articulo guardado",
      });
    } catch (error) {
      console.error("error al guardar el articulo", error);
      return res.status(400).json({
        status: "error",
        mensaje: "no se pudo guardar el archivo",
      });
    }
  };

  

  module.exports ={     
    createProduct
  }