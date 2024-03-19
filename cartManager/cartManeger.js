const fs = require('fs');
const path = require('path');
const validator = require('validator');
const Cart = require('../database/model/cart.model');
const Products = require('../database/model/product.model');

const addToCart = async (req, res) => {
    let productoID = req.params.id;
    let cantidad = req.body.cantidad;

    try {
        let producto = await Products.findById(productoID);
        if (!producto) {
            return res.status(400).json({
                status: "error",
                mensaje: "Producto no encontrado",
            });
        }

        let cart = new Cart({
            producto: productoID,
            cantidad: cantidad
        });

        const cartSaved = await cart.save();
        return res.status(200).json({
            status: "success",
            carrito: cartSaved,
            mensaje: "Producto agregado al carrito",
        });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "No se pudo agregar el producto al carrito",
        });
    }
};

module.exports = {
    addToCart
};
