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

  const getAll = async (req, res) => {
    try {
      const ultimos = req.params.cant;
      const products = await Products.find().sort({ fecha: -1 }).limit(ultimos); //traigo y ordeno de mandera desendente los ultimos alticulos que me llegan por parametro
      return res.status(200).json({
        status: "success",
        contador: products.length, //cuento la cantidad de objetos en el array
        articulos: products,
        mensaje: "Artículos obtenidos exitosamente",
      });
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudieron obtener los artículos",
      });
    }
  };



  module.exports ={     
    createProduct,
    getAll
  }