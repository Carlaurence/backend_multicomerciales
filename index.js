const express = require("express");
const { appConfig } = require('./config')
const connectionDB = require("./config/db");
//IMPORTAMOS LAS RUTAS DEL ROUTER
const routerProduct = require('./router/routerProduct'); //CONEXION AL /ROUTER
const routerUser = require("./router/routerUser"); 
const routerToken = require("./router/routerToken");
const routerCategory = require('./router/routerCategory');
const routerAdvertising = require('./router/routerAdvertising');
const routerManufacturer = require('./router/routerManufacturer');
const routerEngineManufacturer = require('./router/routerEngineManufacturer');
const routerCargoBodyType = require('./router/routerCargoBodyType');
const routerYear = require('./router/routerYear');

const cors = require("cors");
const app = express();
app.use(express.json({extended: true}));//Para habilitar las expresiones .json y generar archivo
connectionDB();//Aqui hacemos el llamado require de la conexion db.js
app.use(cors());//habilitamos los cors justo AQUI

//CREACION DE LAS RUTAS PRIMARIAS DE ENLACE A LA BBDD
app.use("/api/product", routerProduct);//RUTA-URL PRIMARIA DE PRODUCTO EN LA BBDD
app.use("/api/user", routerUser);
app.use("/api/login", routerToken);
app.use("/api/category", routerCategory);
app.use("/api/advertising", routerAdvertising);
app.use("/api/manufacturer", routerManufacturer);
app.use("/api/enginemanufacturer", routerEngineManufacturer);
app.use("/api/cargobodytype", routerCargoBodyType);
app.use("/api/year", routerYear);

//TEST CONNECTION TO DATABASE
app.get('/', (req, res) => res.send('You Are connected to Mongo Database of Multicomerciels'))

const port = process.env.PORT || appConfig.port

console.log(`http//${appConfig.host}:${appConfig.port}`)
app.listen(port, () => {
    console.log("port running in: "+port);
});