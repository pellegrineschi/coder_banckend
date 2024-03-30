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
        return res.render('home',{
        contador: products.length, //cuento la cantidad de objetos en el array
        articulos: products,
        mensaje: "Productos obtenidos exitosamente",
        
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudieron obtener los productos",
      });
    }
  };

  const one = async (req, res) => {
    let id = req.params.id;
    try {
      const productEncontrado = await Products.findById(id); //trae un producto por el id
      if (productEncontrado) {
        return res.status(200).json({
          status: "success",
          articulo: productEncontrado,
          mensaje: "producto econtrado",
        });
      } else {
        return res.status(400).json({
          status: "error",
          mensaje: "producto no encontrado",
        });
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudieron obtener el producto",
      });
    }
  };

  const eliminate = async (req, res) => {
    let articuloId = req.params.id;
    try {
      const productBorrar = await Products.findOneAndDelete({ _id: articuloId });
      if (productBorrar) {
        return res.status(200).json({
          status: "success",
          articulo: productBorrar,
          mensaje: "producto borrado",
        });
      } else {
        return res.status(400).json({
          status: "error",
          mensaje: "no se encontro el producto a borrar",
        });
      }
    } catch (error) {
      console.error("Error al borrar el producto:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudo borrar el producto",
      });
    }
  };

  const edit = async (req, res) => {
    let articuloID = req.params.id;
    let parametro = req.body;
    
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
  
    try {
      const productUpdate = await Products.findByIdAndUpdate(
        { _id: articuloID },
        parametro,
        { new: true }
      );
      if (productUpdate) {
        return res.status(200).json({
          status: "success",
          articulo: productUpdate,
          mensaje: "producto actualizado",
        });
      } else {
        return res.status(400).json({
          status: "error",
          mensaje: "no se encontro el producto a actualizar",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudo actualizar el producto",
      });
    }
  };



  module.exports ={     
    createProduct,
    getAll,
    one,
    eliminate,
    edit
    
  }