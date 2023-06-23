// imports
const mongoose = require('mongoose');
const utils = require('../utils/index');
const { Schema } = mongoose;

// schema definition
const userSchema = new Schema({
    img: {
        type: String,
        default: 'https://cdn.britannica.com/76/122976-050-686AB483/ass-donkey.jpg'
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    joined: {
        type: String,
        default: utils.getCurretDate()
    },
    role: {
        type: String,
        default: 'blogger'
    },
    job: {
        type: String,
        require: false,
        default: ''
    },
    address: {
        type: String,
        require: false,
        default: ''
    },
    about: {
        type: String,
        require: false,
        default: ''
    }
  });

  const User = mongoose.model('User', userSchema);
  
  // exports
  module.exports = {
      User
    };