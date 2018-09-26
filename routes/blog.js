const express = require('express')
const appConfig = require('./../config/appConfig')
const blogController = require('./../controllers/BlogController')

let setRouter =(app) =>{
    let baseUrl = appConfig.apiVersion+ '/blogs';

    app.get(baseUrl+'/all',blogController.getAllData);
    app.get(baseUrl+'/view/:firstname',blogController.getDetailsByFirstName);
    app.post(baseUrl +'/:firstname/delete',blogController.deleteData)
    app.post(baseUrl+'/create',blogController.createData)
    app.put(baseUrl +'/:firstname/edit', blogController.editData)
}


module.exports ={
setRouter: setRouter
}
