const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// app.mountpath
const app = express()


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




//boostrap route

let modelsPath= './models'
fs.readdirSync(modelsPath).forEach(
    function(file){
        if(-file.indexOf('.js')){
           require(modelsPath + '/' + file);
            
        }
    }
)


let routesPath= './routes'
fs.readdirSync(routesPath).forEach(
    function(file){
        if(-file.indexOf('.js')){
            let route = require(routesPath + '/' + file);
            route.setRouter(app);
        }
    }
)




app.listen(appConfig.port, () =>  {
console.log(`Example app listening on port ${appConfig.port}!`)

let db = mongoose.connect(appConfig.db.uri,{ useMongoClient : true});
}
)


mongoose.connection.on('error', function(err) {
    console.log("Error while connecting to database");
    console.log(err);
    
});

mongoose.connection.on('open' , function(err){
    if(err){
        console.log("error");
        
    }
    else{
        console.log("Connection is succedded")
    }
})


