const { response } = require('express');
const Advertising = require('../models/multicomAdvertising');

/******************CREAR UNA PUBLICIDAD NUEVA********************/
/******http://localhost+puerto+URLprimaria+URLsecundaria*********/
/**************http://localhost:4000/api/advertising**[POST]*****/
/*******************advertising.save();**************************/
/*CREAMOS LA FUCION ASYNC QUE CONTIENE LA LOGICA Y LA FUNCION DEL CRUD advertising.save();*/
/**Para crear una publicidad solo necesitamos diligenciar el nombre: "" y una image: ""*/
exports.createAdvertising = async (req, res) => {
    try{
        if(!req.body.name || !req.body.image){//1º Filtro 
            return res.status(200).json({msg: "ERROR: Email e Imagen son campos obligatorios!"});
        }else{
            const advertising = new Advertising(req.body);
            advertising.creatorUserId = req.user.id;//Traido del payload
            const newAdvertising = await advertising.save();//Guardar registro en la Base de Datos
            res.json(newAdvertising)
        }
    }catch(error){
        res.json(error)
    }
}


/************************GET ALL ADVERTISEMENTS******************/
/******http://localhost:puerto+URLprimaria+URLsecundaria*****/
/********http://localhost:4000/api/advertising*+ [GET]*********/
exports.getAllAdvertising = async (req, res) => {
    try{
        const advertisements = await Advertising.find();
        res.status(202).json({advertisements})
    }catch(error){
        res.json(error)
    }
}