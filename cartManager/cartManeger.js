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

        let cart = await Cart.findOne({}) || new Cart();

        //buscar producto en el carrito
        let productInCart = cart.products.find(p => p.product.toString()=== productoID);

        if (productInCart){
            productInCart.cantidad += Number(cantidad);
        }else{
            cart.products.push({
                product: productoID,
                cantidad: cantidad
            })
        }

        

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

const getCart = async(req, res)=>{
    try{
        const cart = await
        Cart.findOne({}).populate('products.product');
        console.log(JSON.stringify(cart,null,2));
        return res.status(200).json({
            status: 'success',
            carrito: cart.products.map(p => ({
              product: p.product,
              catidad: p.cantidad  
            })),
            mensaje: 'carrito obtenido'
        });
    }catch(error){
        console.error('Error al obtener el carrito: ', error);
        return res.status(500).json({
            status: 'error',
            mensaje: 'no se pudo obtener el carrito'
        });

    }
};

module.exports = {
    addToCart,
    getCart
};
