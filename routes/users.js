'use strict'

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.route('/')
    //index all users ** for admin only **
    .get(function(req, res) {
        knex('users')
            .then(function(users) {
                res.render('users/index', {
                    users
                })
            })
        // res.send('yomamma')
    })

    // AUTH POST TO CREATE NEW ACCOUNT
    .post((req, res) => {
        var hash = bcrypt.hashSync(req.body.cred.password_digest, 10)
        req.body.cred.password_digest = hash
        knex('users').insert(req.body.cred).then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.send('didn\'t work');
        });
    });


router.route('/new')
    // SIGNUP PAGE
    .get((req, res) => {
        res.render('users/new');
    })

router.route('/:user_id')

    .delete((req, res) => {
        knex('users')
            .where(
                'id', req.params.user_id
            )
            .del()
            .then(() => {
                res.redirect('/users');
            });
    })

    .get(function(req, res) {
      console.log(req.header);
        knex('users')
            .where('id', req.params.user_id)
            .first()
            .then(function(dude) {
                res.render('users/show', {
                    dude
                });
            });
    });

router.route('/:user_id/delete')
    .get(function(req, res) {
        knex('users')
            .select('id')
            .where(
                'id', req.params.user_id
            )
            .first()
            .then(function(user) {
                res.render('users/delete', {
                    user
                });
            });
    })

module.exports = router;
