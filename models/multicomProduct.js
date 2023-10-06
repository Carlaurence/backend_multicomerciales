/************************************MONGOOSE - ORM*********************************************/
const mongoose = require("mongoose");/******IMPORTANDO EL ORM: OBJECT RELATIONAL MAPPING********/
/*MONGOOSE: SE ENCARGA DE LLEVAR Y RELACIONAR LOS OBJETOS DE ESTA CLASE MODELO=> A LA BBDD MONGODB*/
/***********************************************************************************************/

/**********************************CLASE MODELO => PRODUCTO*************************************/
/*********CREARNDO LA CLASE-MODELO QUE REPRESENTARA LA TABLA: PRODUCTO EN LA BBDD***************/
/********************SETTEANDO LAS PROPIEDADES DE CADA CAMPO DE LA TABLA************************/
const ProductSchema = mongoose.Schema({
    vin: {type: String, required:true, trim:true, unique:true},
    make: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    year: {type: Number, required: true, trim: true},
    odometer: {type: Number, required: true, trim: true},
    engineManufacturer: {type: String, required: true, trim: true},
    gvwr: {type: Number, required: true, trim: true},//Gross Vehicle Weight Rating = Capacidad de carga
    cargoBodyType: {type: String, required: true, trim: true},//only these options => Boxtruck, Refrigerated, Lorry Wooden Body "carroceria Madera", flatbed "Planchon", other 
    length: {type: Number, required: true, trim: true},//largo
    width: {type: Number, required: true, trim: true},//ancho
    height: {type: Number, required: true, trim: true},//altura
    price: {type: Number, required: true, trim: true},
    images: [{type:String}],
    creatorUserId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "multicomUser"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "multicomCategory"},
    registerDate: {type: Date, default: Date.now()},
    isAvailable: {type: Boolean, required: true, trim: true},
    soldDate: {type: Date, default: Date.now()}//CORREGIR FORMATO DE INGRESO MANUAL Y REQUIRED TRUE
    
});/********************************************************************************************/
//customerId: {type: mongoose.Schema.Types.ObjectId, required:false, ref: "multicomCustomer"}//PENDIENTE
/********************DEFINIR NOMBRE DEL MODELO "multicomProduct" Y EXPORTARLO**************************/
module.exports = mongoose.model("multicomProduct", ProductSchema)/***********************************/
/***********************************************************************************************/


/************************PROPIEDADES DE LA TABLA PRODUCTO:**************************************/
/**********type: String => Almacena datos de tipo String****************************************/
/**********require: true => No acepta nullos****************************************************/
/**********type: Date => Tipo fecha*************************************************************/
/**********default: true => Formato por default MM/DD/YY/***************************************/
/**********trim: true => Elimina los espacios y almacena en BD todo junto***********************/
/***********************************************************************************************/