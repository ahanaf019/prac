const express = require('express')
const bodyParser = require('body-parser')
const Dish = require('../models/dish')

const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        Dish.find({})
            .then((dish) => {
                res.statusCode = 200
                res.setHeader('Content-Type','application/json')
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => console.log(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.setHeader('Content-Type','text/html')
        res.end('PUT operation not supported on /dishes')
    })
    .post((req, res, next) => {
        Dish.create(req.body)
            .then((dish) => {
                res.stat = 200
                res.setHeader('Content-Type','application/json')
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => console.log(err))
    })
    .delete((req, res, next) => {
        Dish.remove({})
            .then((resp) => {
                res.stat = 200
                res.setHeader('Content-Type','application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => console.log((err)))
    })

router.route('/:dishId')
    .get((req, res, next) => {
        Dish.findById(req.params.dishId)
            .then((dish) => {
                if(dish === null) {
                    res.statusCode = 404
                    res.setHeader('Content-Type','text/html')
                    res.end('The dish with id: ' + req.params.dishId + ' was not found.')
                }
                else {
                    res.stat = 200
                    res.setHeader('Content-Type','application/json')
                    res.json(dish)
                }

            }, (err) => next(err))
            .catch((err) => console.log(err))
    })
    .put((req, res, next) => {
        Dish.findByIdAndUpdate(req.params.dishId,{ $set : req.body})
            .then((dish) => {
                res.stat = 200
                res.setHeader('Content-Type','application/json')
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => console.log(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.setHeader('Content-Type','text/html')
        res.end('POST operation not supported on /dishes/' + req.params.dishId)
    })
    .delete((req, res, next) => {
        Dish.findByIdAndDelete(req.params.dishId)
            .then((resp) => {
                res.stat = 200
                res.setHeader('Content-Type','application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => console.log((err)))
    })


module.exports = router