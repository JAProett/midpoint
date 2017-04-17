'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
require('dotenv').load();

router.route('/')
  .get((req, res) => {
    res.render('statics/map', {apiKey: process.env.API_KEY});
  });

module.exports = router;
