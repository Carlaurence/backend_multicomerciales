const express = require("express");
const router = express.Router();//ESTE ELELEMNTO LLAMA AL TIPO DE PETICION [get, post, put, delete]
const controllerProduct = require('../controllers/controllerProduct');//CONEXION AL /CONTROLLER
const tokenVerifier = require('../middleware/tokenVerifier');

//CONSTRUCCION DE LAS RUTAS SECUNDARIAS URL ASOCIADAS A LAS FUNCIONES DEL CONTROLLER, PARA HACER LAS PETICIONES 
router.post("/:id", tokenVerifier, controllerProduct.createProduct);//:id REQUIERE EL ID DE LA CATEGORIA A LA QUE PERTENECE
router.get("/", controllerProduct.getAllProducts);
router.get("/:id", controllerProduct.getProductsByIdCategory);//PRODUCTOS POR CATEGORIA. EL /:id ES EL DELA CATEGORY QUE DESEAMOS CONSULTAR
router.get("/idproduct/:id", tokenVerifier, controllerProduct.getProductsByIdProduct)
router.put("/:id", tokenVerifier, controllerProduct.updateProduct); //ACTUALIZAR 

module.exports = router;//IMPORTANTE!!!
//EN CASO DE OLVIDAR EXPORTAR EL ROUTER, ARROJARA EL SIGUIENTE ERROR:
/**
 * throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
      ^
* TypeError: Router.use() requires a middleware function but got a Object
 */