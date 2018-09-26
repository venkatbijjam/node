const express = require('express')
const mongoose = require('mongoose')

//importing model

const blogModel = mongoose.model('users');


//getting data form DB
let getAllData = ((req,res) =>{

    blogModel.find()
        .select('-_v -_id')
        .lean()
        .exec((err,result) =>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else if(result == undefined || result == null || result == '')
            {
                console.log('No blog Find')
                res.send("No Blog Found")
            }
            else{
                res.send(result)
            }
        }
        )
})

// retrive by first name the data

let getDetailsByFirstName =((req,res) =>{

    blogModel.findOne( {'firstname': req.params.firstname}, 
    (err,result) =>{
        if(err){
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
        
            res.send("No Blog Found")
        } else {
            res.send(result)
        }
    }
    )
})

// creating data

let createData =((req,res) =>{

var today =Date.now;

let newData = blogModel(
    {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        createDate: today
    }
)

newData.save((err,result) => {
    if(err){
        console.log('No data')
        res.send(err)
    }
    else{
        res.send(result)
    }
})

}) // end of create menthod

//delete data
let deleteData =((req,res) =>{

    blogModel.remove({'firstname': req.params.firstname}, (err,result)  =>{
        if(err){
            console.log('error while deleting')
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
       
            res.send(result)
        }
    })
}) // end of delete

// edit data
let editData = ((req,res) =>{

let options = req.body;
console.log(options)

blogModel.update({ 'firstname': req.params.firstname }, options, { multi: true }).exec((err, result) => {

    if (err) {
        console.log(err)
        res.send(err)
    } else if (result == undefined || result == null || result == '') {
        console.log('No Blog Found')
        res.send("No Blog Found")
    } else {
        res.send(result)

    }
})
})


module.exports= {
getAllData: getAllData,
deleteData:deleteData,
createData:createData,
getDetailsByFirstName:getDetailsByFirstName,
editData :editData,
}