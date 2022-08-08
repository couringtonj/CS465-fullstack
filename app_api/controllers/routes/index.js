const express=require('express');
const router=express.Router();
const jwt=require('express-jwt');
const auth=jwt({
    secret: process.env.JWT_SECRET,
    userPropert:'payload'

});

const { Router } = require('express');
const authController=require('../controllers/authentication');
const tripsController=require('../controllers/trips');

Router
    .route('/login')
    .post(authController.login)
    .post(auth, tripsController.tripsAddTrip);

Router
    .route('/register')
    .post(authController.register)
    .put(auth, tripsController.tripsUpdateTrip);

