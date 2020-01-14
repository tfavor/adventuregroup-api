const express = require('express')
const EventsService = require('./Events-service')
const path = require('path')
const { requireAuth } = require('../middleware/jwt-auth')
const AuthService = require('../auth/auth-service')

const eventsRouter = express.Router()
const jsonParser = express.json()

const serializeEvent = event => ({
    id: event.id,
    name: event.name,
    location: event.location,
    date: event.date,
    time: event.time, 
    type: event.type,
    users_attending: event.users_attending,
    creator_id: event.creator_id,
    details: event.details
})

eventsRouter
    .route('/')
    .get((req, res, next) => {
        EventsService.getAllEvents(
            req.app.get('db')
        )
        .then(events => {
            res.json(events)
            console.log(res.json('events' + events))
        })
        .catch(next)
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const token = req.header('Authorization').substring(7);
        console.log(token)
        const id = AuthService.parseBasicToken(token)[3]
        const creator_id = parseInt(id);
        const { name, location, date, type, users_attending, details } = req.body
        const newEvent = { name, location, date, type, users_attending, creator_id, details }
        for(const [key, value] of Object.entries(newEvent)) {
            if(value == null) {
                return res.status(400).json({
                    error: { mesage: `Missing '${key}' in request body` }
                })
            }
        }
        EventsService.insertEvent(
            req.app.get('db'),
            newEvent
        )
        .then(event => {
            res.status(201).location(path.posix.join(req.originalUrl + `/${event.id}`))
            .json(event)
        })
        .catch(next)
    })
eventsRouter
    .route('/:event_id')
    .all(requireAuth)
    .all((req, res, next) => {
        EventsService.getById(
            req.app.get('db'),
            req.params.event_id
        )
        .then(event => {
            if(!event) {
                return res.status(404).json({
                    error: { message: `event does not exist` }
                })
            }
            res.event = event
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeEvent(res.event))
    })
    .patch(jsonParser, (req, res, next) => {
        const { name, location, date, time, type, users_attending, creator_id, details } = req.body
        const eventToUpdate = { name, location, date, time, type, users_attending, details }

        const numberOfValues = Object.values(eventToUpdate).filter(Boolean).length
        if(numberOfValues === 0) {
            return res.status(400).json({
                error: { message: `Request body must contain either 'name', 'location', 'date', 'time', 'type', 'users_attending', or 'details'` }
            })
        }
        EventsService.updateEvent(
            req.app.get('db'),
            req.params.event_id,
            eventToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .delete(jsonParser, (req, res, next) => {
        EventsService.deleteEvent(
            req.app.get('db'),
            req.params.event_id          
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
    })
module.exports = eventsRouter    