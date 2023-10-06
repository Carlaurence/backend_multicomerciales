const { response } = require("express");
//INSTANCIAMOS UN ELEMENTO/OBJ DE LA TABLA "multicomProduct.js" PARA PODER INSTANCIAR LAS FUNCIONES DEL CRUD 
const Product = require("../models/multicomProduct");//CONEXION AL MODELO/TABLA
const Category = require('../models/multicomCategory');//PARA LLAMAR A LA CATEGORIA MEDIANTE EL /:ID DEL PARAMS

/******************CREAR UN PRODUCTO******************/
/******http://localhost+puerto+URLprimaria+URLsecundaria*****/
/**************http://localhost:4000/api/product/**********/
/*******************product.save();*******************/
/*CREAMOS LA FUCION ASYNC QUE CONTIENE LA LOGICA Y LA FUNCION DEL CRUD product.save();*/
/**IMPORTANTE: PARA CREAR UN PRODUCTO, SIEMPRE SE VA A REQUERIR LA CATEGORIA A LA QUE PERTENECE, Y ESO
 * LO LOGRAMOS MEDIANTE LOS PARAMS QUE SE REGISTRAN EN LA URL /:id*/
exports.createProduct = async (req, res) => {

    const { id } = req.params;//id DE LA CATEGORIA SE CAPTURA POR LA URL /:id Y SE UTILIZA PARA ASIGNARLE LA CATEGORIA AL NEW PRODUCTO QUE SE VA A CREAR
    const { vin, make, model, year, odometer, engineManufacturer, gvwr, cargoBodyType, length, width, height, price, images, isAvailable } = req.body;

    try {
        const category = await Category.findById(id);

        if(!vin || !make || !model || !year || !odometer || !engineManufacturer || !gvwr || !cargoBodyType || !length || !width || !height || !price || !images || !isAvailable){//1º Filtro 
            return res.status(200).json({msg: "ERROR: Todos los campos son obligatorios!"});
        }else if(!category){
            return res.status(200).json({ msg: "WARNING: Categoria no existe en la BBDD" });
        }else{
            const product = new Product(req.body);//crear un nuevo Obj Producto
            product.creatorUserId = req.user.id;//req.user.id ES UN REQUEST QUE SE LE HACE AL payload{user: {id: user.id}} 
            //DESDE /controllerToken en la funcion crearToken() LA CUAL NOS RETORNA EL ID DEL USUARIO AUTENTICADO 
            product.categoryId = category.id;
            const newProduct = await product.save();//Guardar registro en la Base de Datos
            res.json(newProduct)
        }
    }catch(error){
        res.json(error)
    }
}

/******************CONSULTAR LOS PRODUCTOS EXISTENTES (ALL)******************/
/******http://localhost+puerto+URLprimaria+URLsecundaria*****/
/**************http://localhost:4000/api/product/*+*[GET]********/
/*******************await Product.find()*******************/
exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        if(!products){
            return res.status(200).json({msg: "no hay productos en la BBDD"})
        }else{
            return res.status(200).json({products})
        } 
    }catch(error){
        res.json(error)
    }
}

/******************CONSULTAR PRODUCTOS EXISTENTES (BY ID CATEGORIA)******************/
/******http://localhost+puerto+URLprimaria+URLsecundaria************/
/**************http://localhost:4000/api/product/:id*+*[GET]********/
/*******************await Product.find()*******************/
exports.getProductsByIdCategory = async (req, res) => {

    const { id } = req.params;//id DE LA CATEGORIA SE CAPTURA POR LA URL /:id Y SE UTILIZA PARA BUSCAR TODOS LOS PRODUCTOS QUE PERTENEZCAN A ESA CATEGORIA

    try{
        const products = await Product.find({categoryId:id});
        if(!products){
            return res.status(200).json({msg: "no hay productos en esta categoria"})
        }else{
            return res.status(200).json({products})
        } 
    }catch(error){
        res.json("error")
    }
}

/******************CONSULTAR PRODUCTOS EXISTENTES (BY ID PRODUCTO)******************/
/******http://localhost+puerto+URLprimaria+URLsecundaria************/
/**************http://localhost:4000/api/product/idproduct/:id*+*[GET]********/
/*******************await Product.find()*******************/
exports.getProductsByIdProduct = async (req, res) => {

    const { id } = req.params;//id DE LA CATEGORIA SE CAPTURA POR LA URL /:id Y SE UTILIZA PARA BUSCAR TODOS LOS PRODUCTOS QUE PERTENEZCAN A ESA CATEGORIA

    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(200).json({msg: "no hay producto con ese id"})
        }else{
            return res.status(200).json({product})
        } 
    }catch(error){
        res.json("error: id invalido")
    }
}



/******************MODIFICAR UN PRODUCTO (BY ID PRODUCTO)******************/
/******http://localhost+puerto+URLprimaria+URLsecundaria*******************/
/**************http://localhost:4000/api/product/:id*+*[PUT]***************/
/*******************await productById.save()*******************************/
/***********************REQUIERE TOKEN*************************************/ 
exports.updateProduct = async (req, res) => {

    const { id } = req.params;//id DEL PRODUCTO SE CAPTURA POR LA URL /:id Y SE UTILIZA PARA BUSCARLO EN LA BBDD

    try{
        const productById = await Product.findById( id );
        if(!productById){
            return res.status(200).json({msg: "productos no existe"})
        }else{
            /**SETEAR LOS CAMPOS DEL PRODUCTO CON LA INFORMACION REQUERIDA DEL POSTMAN**/
            productById.vin = req.body.vin || productById.vin;
            productById.make = req.body.make || productById.make;
            productById.model = req.body.model || productById.model;
            productById.year = req.body.year || productById.year;
            productById.odometer = req.body.odometer || productById.odometer;
            productById.engineManufacturer = req.body.engineManufacturer || productById.engineManufacturer;
            productById.gvwr = req.body.gvwr || productById.gvwr;
            productById.cargoBodyType =req.body.cargoBodyType || productById.cargoBodyType;
            productById.length = req.body.length || productById.length;
            productById.width = req.body.width || productById.width;
            productById.height = req.body.height || productById.height;
            productById.price = req.body.price || productById.price;
            productById.isAvailable = req.body.isAvailable || productById.isAvailable;
            if(req.body.images){
                productById.images.push(req.body.images); 
            }
            //GUARDAR LOS CAMBIOS EN LA BBDD
            productById.save();
            console.log(productById);
            return res.status(200).json({msg:productById})
        } 
    }catch(error){
        res.json(error)
    }
}