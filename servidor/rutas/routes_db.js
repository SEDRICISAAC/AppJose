const express = require("express");
let api = express.Router(),
  control = require("../controles/crud");
  
  


api.get("/menu/platos", control.getPlatos);
api.post("/menu", control.postDatos);
api.put("/menu", control.updateDatos);
api.delete("/menu", control.deleteDatos);
api.post("/login", control.login);


module.exports = api;
