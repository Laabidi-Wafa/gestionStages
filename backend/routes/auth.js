const express = require('express');


//validation of the input of the sign-up
//checks if the email exists or not
//the format or empty fields
const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../Controllers/auth');



//signUp
router.post(
    '/signup',
    [ //Control
      body('name').trim().not().isEmpty(),
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async (email) => {
          const user = await User.find(email);
          if (user[0].length > 0) {
            return Promise.reject('Email address already exist!');
          }
        })
        .normalizeEmail(),
      body('password').trim().isLength({ min: 7 }),
    ],
    authController.signup
  );


  //login
  router.post('/login', authController.login);


    module.exports = router;
